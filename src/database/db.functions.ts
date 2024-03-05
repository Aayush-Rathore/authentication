import {
  CreateUserInterface,
  LogInUserInterface,
} from "../interface/services.interface";
import IUser from "../interface/user.interface";
import { User } from "../models/userSchema.models";
import ApiError from "../utils/apiError.utils";
import Tokens from "../services/token.services";

class DB_Functions {
  private tokens = new Tokens();

  public findUser = async ({
    username,
    email,
    id,
  }: {
    username?: string;
    email?: string;
    id?: string;
  }): Promise<IUser> => {
    const user = await User.findOne({
      $or: [{ username }, { email }, { _id: id }],
    });

    if (!user)
      throw new ApiError(
        404,
        "USER_NOT_FOUND",
        `User not found with this ${
          (email && `Email: ${email}`) ||
          (username && `Username: ${username}`) ||
          (id && `id: ${id}`)
        }`
      );

    if (!user?.isVerified)
      throw new ApiError(
        402,
        "VALIDATION_ERROR!",
        "Email is not verified!\n Verify your email before resetting your password!"
      );

    return user;
  };

  public createUser = async (
    createUserCredentials: CreateUserInterface
  ): Promise<{ registeredUser: IUser; token: string }> => {
    const registeredUser: IUser = await User.create(createUserCredentials);
    const { refreshToken } = await this.tokens.GenerateTokens(registeredUser, {
      refresh: true,
    });
    return { registeredUser, token: refreshToken };
  };

  public logInUser = async (
    loginUserCredentials: LogInUserInterface
  ): Promise<IUser> => {
    const { username, email, password } = loginUserCredentials;
    const user: IUser = await this.findUser({ username, email });
    const checkPass: boolean = await user.matchPassword(password);
    if (!checkPass)
      throw new ApiError(
        401,
        "WRONG_PASSWORD",
        "Wrong password, Please check password and try again!"
      );
    return user;
  };

  public verifyUser = async (id: string): Promise<void> => {
    await User.findByIdAndUpdate(
      { _id: id },
      {
        isVerified: true,
      }
    );
  };

  public matchPassword = async (
    user: IUser,
    oldPassword: string
  ): Promise<Boolean> => {
    const checkPass = await user.matchPassword(oldPassword);
    if (!checkPass) return false;
    return true;
  };

  public updatePassword = async (
    user: IUser,
    newPassword: string
  ): Promise<Boolean> => {
    try {
      user.password = newPassword;
      user.save({ validateBeforeSave: false });
      return true;
    } catch (error) {
      return false;
    }
  };

  public logOut = async (id: string) => {
    User.findByIdAndUpdate(
      id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );
  };
}

export default DB_Functions;
