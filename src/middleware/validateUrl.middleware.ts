import { NextFunction, Request, Response } from "express";
import { verifyTempToken } from "../utils/verifyTokens.utils";
import ApiError from "../utils/apiError.utils";

const validateUrl = async (req: Request, res: Response, next: NextFunction) => {
  const urlValidationToken = req.query.token as string;

  const isUrlValid = await verifyTempToken(urlValidationToken).catch(
    (error: any) => {
      throw new ApiError(401, "URL_EXPIRED!", "Invalid url, Please try again!");
    }
  );
  req.body.userId = isUrlValid;
  next();
};

export default validateUrl;
