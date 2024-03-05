import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "./apiError.utils";
import ApiResponse from "./apiResponse.utils";
import { User } from "../models/userSchema.models";
import { verifyRefreshToken } from "./verifyTokens.utils";

export const verifyEmail = async (
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
  const verifyUser: JwtPayload | string = await verifyRefreshToken(token).catch(
    (error) => {
      throw new ApiError(401, error.message, "Invalid verification url!");
    }
  );

  if (typeof verifyUser === "object" && verifyUser !== null) {
    await User.findByIdAndUpdate(
      { _id: verifyUser.id },
      {
        isVerified: true,
      }
    );
  }

  new ApiResponse(
    202,
    "EMAIL_VERIFIED!",
    "Enjoy exploring voice nest",
    verifyUser,
    res
  );
};
