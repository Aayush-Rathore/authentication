import { Request, Response } from "express";
import ApiError from "../utils/apiError.utils";
import ApiResponse from "../utils/apiResponse.utils";
import UserValidation from "../validations/user.validations";
import UserServices from "../services/user.services";
import S3Helper from "../utils/s3Helper.utils";

const validation = new UserValidation();
const userServices = new UserServices();
const s3Helper = new S3Helper();

// SignUp Functionality completed
export const SignUp = async (req: Request, res: Response): Promise<void> => {
  await validation.SignUpValidation.validateAsync(req.body);

  if (req.file) {
    const { path, filename } = req.file;
    req.body.profileUrl = await s3Helper.uploadToCloud({
      filePath: path,
      fileName: filename,
    });
  }
  await userServices.sinUpUser(req.body);
  new ApiResponse(
    201,
    "SUCCESS!",
    "Verify your email before login!",
    {
      message:
        "Check your inbox and click the provided link to verify you email address!",
    },
    res
  );
};

// SignIn Functionality completed
export const SignIn = async (req: Request, res: Response): Promise<void> => {
  await validation.SignInValidation.validateAsync(req.body);

  const { user, accessToken, refreshToken } = await userServices.logInUser(
    req.body
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);

  new ApiResponse(
    200,
    "SUCCESSFULLY_LOGED_IN!",
    `Welcome ${user.fullName}`,
    { user, accessToken, refreshToken },
    res
  );
};

// Forget Password Functionality completed
export const ForgetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validation.ForgetPasswordValidation.validateAsync(req.body);

  await userServices.forgetPassword(req.body);

  new ApiResponse(
    200,
    "SUCCESS!",
    "Check your email to reset password!",
    {
      message:
        "Check your inbox and click the provided link to change your password!",
    },
    res
  );
};

// Reset Password Functionality completed
export const ResetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  await validation.ResetPasswordValidation.validateAsync(req.body);

  const {
    newPassword,
    userId,
  }: { newPassword: string; userId: { id: string } } = req.body;

  const resetPassword = await userServices.resetPassword(
    userId.id,
    newPassword
  );

  if (resetPassword) {
    new ApiResponse(
      200,
      "SUCCESS!",
      "Password changed successfully!",
      {
        message: "Your new password is updated successfully!",
      },
      res
    );
  } else {
    throw new ApiError(500, "PASSWORD_NOT_CHANGED!", "Something went wrong!");
  }
};

// Verify email Functionality completed
export const VerifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.query.token as string;
  if (!token)
    throw new ApiError(
      401,
      "EMAIL_VERIFICATION_FAILED!",
      "Please request for the verification mail again!"
    );
  await userServices.verifyEmail(token);

  new ApiResponse(
    202,
    "EMAIL_VERIFIED!",
    "Enjoy exploring voice nest",
    {
      message: "Email verified! Now you can start exploring.",
    },
    res
  );
};
