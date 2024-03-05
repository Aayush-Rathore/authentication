import { Router } from "express";
import {
  ForgetPassword,
  SignIn,
  SignUp,
  ResetPassword,
  VerifyEmail,
} from "../Controllers/user.controllers";
import { fileUpload } from "../middleware/fileUpload.middleware";
import { asyncHandler } from "../utils/asyncHandler.utils";
import validateUrl from "../middleware/validateUrl.middleware";

const router = Router();

router.route("/signin").post(asyncHandler(SignIn));

router.route("/signup").post(fileUpload.single("avatar"), asyncHandler(SignUp));

router.route("/forgetPassword").post(asyncHandler(ForgetPassword));

router
  .route("/resetPassword")
  .post(asyncHandler(validateUrl), asyncHandler(ResetPassword));

router.route("/verifyEmail").get(asyncHandler(VerifyEmail));

export default router;
