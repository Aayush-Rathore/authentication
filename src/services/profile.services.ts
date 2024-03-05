import DB_Functions from "../database/db.functions";
import { UpdatePasswordInterface } from "../interface/services.interface";
import { VerificationInterface } from "../interface/application.interface";
import Tokens from "./token.services";
import ApiError from "../utils/apiError.utils";

class ProfileServices {
  private tokens = new Tokens();
  private dbFunction = new DB_Functions();

  public updatePassword = async (
    updatePassword: UpdatePasswordInterface,
    verificationInfo: VerificationInterface
  ) => {
    const user = await this.dbFunction.findUser({ id: verificationInfo.id });
    let refreshToken;
    if (verificationInfo.flag) {
      refreshToken = await this.tokens.GenerateTokens(user, {
        refresh: true,
      });
    }

    const checkPass = await this.dbFunction.matchPassword(
      user,
      updatePassword.oldPassword
    );

    if (checkPass) {
      user.password = updatePassword.newPassword;
      await user.save({ validateBeforeSave: false });
      return { updated: true, refreshToken };
    } else {
      throw new ApiError(
        401,
        "WRONG_PASSWORD!",
        "Wrong password, Please try again!"
      );
    }
  };

  public logoutUser = async (
    verificationInto: VerificationInterface
  ): Promise<Boolean> => {
    await this.dbFunction.logOut(verificationInto.id);
    return true;
  };
}

export default ProfileServices;
