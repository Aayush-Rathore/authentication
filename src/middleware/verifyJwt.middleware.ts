import { Response, NextFunction } from "express";
import {
  PRequest,
  VerificationInterface,
} from "../interface/application.interface";
import { asyncHandler } from "../utils/asyncHandler.utils";
import Tokens from "../services/token.services";
import ApiError from "../utils/apiError.utils";

const tokens = new Tokens();

const verifyJwt = asyncHandler(
  async (req: PRequest, res: Response, next: NextFunction) => {
    const tempToken = req.query.token as string;
    const { accessToken, refreshToken } = req.cookies || req.headers.cookie;

    const tokenPayload: VerificationInterface = await (tempToken
      ? tokens.VerifyToken({ tempToken })
      : accessToken
      ? tokens.VerifyToken({ accessToken })
      : tokens.VerifyToken({ refreshToken }));

    if (!tokenPayload)
      throw new ApiError(409, "NOT_AUTORIZED", "You are not authorized!");
    else req.verificationInfo = tokenPayload;

    next();
  }
);

export { verifyJwt };
