import { NextFunction, Response } from "express";
import { PRequest } from "../interface/application.interface";
import { verifyTempToken } from "../utils/verifyTokens.utils";
import ApiError from "../utils/apiError.utils";

const validateUrl = async (
  req: PRequest,
  res: Response,
  next: NextFunction
) => {
  const urlValidationToken = req.query.token as string;

  const isUrlValid: any = await verifyTempToken(urlValidationToken).catch(
    (error: any) => {
      throw new ApiError(401, "URL_EXPIRED!", "Invalid url, Please try again!");
    }
  );
  req.verificationInfo = isUrlValid.id;
  next();
};

export default validateUrl;
