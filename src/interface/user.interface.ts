import { Document, Schema } from "mongoose";

interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  profileUrl?: string;
  posts?: Schema.Types.ObjectId[];
  query?: Schema.Types.ObjectId[];
  creditScore: number;
  password: string;
  isVerified?: boolean;
  firstLogin?: boolean;
  refreshToken?: string;

  matchPassword(password: string): Promise<boolean>;
  generateTempToken(): Promise<string>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
  removeSensitiveFields(): Promise<void>;
}

export default IUser;
