import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface VerificationInterface {
  id: string;
  email?: string;
  username?: string;
  flag?: boolean;
}

export interface PRequest extends Request {
  verificationInfo?: VerificationInterface;
}
