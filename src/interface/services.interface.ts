import { JwtPayload } from "jsonwebtoken";

export interface CreateUserInterface {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LogInUserInterface {
  username: string;
  email: string;
  password: string;
}

export interface UpdatePasswordInterface {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export interface TokensInterface {
  accessToken: string;
  refreshToken: string;
  tempToken: string;
}

export interface TokenPayload {
  aceessTokenPayload?: JwtPayload | string;
  refreshTokenPayload?: JwtPayload | string;
  tempTokenPayload?: JwtPayload | string;
}
