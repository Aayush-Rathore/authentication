import IUser from "../interface/user.interface";
import ApiError from "../utils/apiError.utils";
import {
  CreateUserInterface,
  LogInUserInterface,
} from "../interface/services.interface";
import sendMail from "../utils/sendMail.utils";
import DB_Functions from "../database/db.functions";
import Tokens from "./token.services";

class UserServices {
  private dbFunction = new DB_Functions();
  private tokens = new Tokens();

  public sinUpUser = async (
    userCredentials: CreateUserInterface
  ): Promise<void> => {
    try {
      const { registeredUser, token } = await this.dbFunction.createUser(
        userCredentials
      );

      sendMail(
        registeredUser.fullName,
        registeredUser.email,
        "Verify Your Email Address for Voice Nest",
        token
      );
    } catch (error: any) {
      throw new ApiError(
        error.statusCode,
        error.message,
        "Something went wrong while creating a user!",
        error
      );
    }
  };

  public logInUser = async (
    login: LogInUserInterface
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> => {
    const user = await this.dbFunction.logInUser(login);
    const { accessToken, refreshToken } = await this.tokens.GenerateTokens(
      user,
      { access: true, refresh: true }
    );

    return { user, accessToken, refreshToken };
  };

  public verifyEmail = async (token: string): Promise<void> => {
    const refreshTokenPayload = await this.tokens
      .VerifyToken({
        refreshToken: token,
      })
      .catch((error: any) => {
        throw new ApiError(401, error.message, "Invalid verification url!");
      });

    if (
      typeof refreshTokenPayload === "object" &&
      refreshTokenPayload !== null
    ) {
      await this.dbFunction.verifyUser(refreshTokenPayload.id);
    }
  };

  public forgetPassword = async ({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }): Promise<void> => {
    const user = await this.dbFunction.findUser({ email, username });

    const token: string = await user.generateTempToken();
    sendMail(user.fullName, user.email, "Change your password!", token);
  };

  public resetPassword = async (
    id: string,
    newPassword: string
  ): Promise<Boolean> => {
    const user = await this.dbFunction.findUser({ id });
    const isPasswordNotModified = await this.dbFunction.matchPassword(
      user,
      newPassword
    );
    if (!isPasswordNotModified)
      throw new ApiError(
        401,
        "PASSWORD_MATCHED!",
        "Password can't be same as previews!"
      );
    return await this.dbFunction.updatePassword(user, newPassword);
  };
}

export default UserServices;
