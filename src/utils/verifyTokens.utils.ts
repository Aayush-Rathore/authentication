import { verify } from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.utils";
import { NextFunction, Request, Response } from "express";

export const verifyRefreshToken = async (token: string) => {
  return await verify(token, process.env.REFRESH_TOKEN_KEY);
};

export const verifyTempToken = async (token: string) => {
  return await verify(token, process.env.TEMP_TOKEN_KEY);
};

export const verfiyToke = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.query.token as string;
    if (!token) {
    } else {
      const tokenPayload = await verifyTempToken(token);
      console.log(tokenPayload);
    }
  }
);
