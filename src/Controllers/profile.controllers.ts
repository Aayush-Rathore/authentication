import { Response } from "express";
import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import ProfileServices from "../services/profile.services";
import ProfileValidation from "../validations/profile.validation";
import { PRequest } from "../interface/application.interface";

const profileServices = new ProfileServices();
const profileValidation = new ProfileValidation();

export const LogOut = async (req: PRequest, res: Response): Promise<void> => {
  if (req.verificationInfo) {
    const logOut: Boolean = await profileServices.logoutUser(
      req.verificationInfo
    );
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("accessToken", options).clearCookie("refreshToken", options);

  new ApiResponse(
    200,
    "LOGED_OUT!",
    "Loged out successfully!",
    { message: "Logout successfully! By by" },
    res
  );
};

export const UpdatePassword = async (
  req: PRequest,
  res: Response
): Promise<void> => {
  await profileValidation.UpdatePassword.validateAsync(req.body);
  if (!req.verificationInfo)
    throw new ApiError(403, "NOT_AUTHORIZED", "You are not authorized!");

  const {
    oldPassword,
    newPassword,
  }: { oldPassword: string; newPassword: string } = req.body;

  if (oldPassword === newPassword)
    throw new ApiError(
      409,
      "NOT_MODIFIED",
      "Old and new password, both are same! Please try with different password!"
    );

  const isPasswordChanged = await profileServices.updatePassword(
    req.body,
    req.verificationInfo
  );

  if (isPasswordChanged.refreshToken) {
    await res.cookie("refreshToken", isPasswordChanged.refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }

  if (isPasswordChanged.updated)
    new ApiResponse(
      200,
      "SUCCESS!",
      "Password changed successfully!",
      {
        message: "Your new password is updated successfully!",
      },
      res
    );
};
