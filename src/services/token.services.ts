import IUser from "../interface/user.interface";
import { verify } from "jsonwebtoken";
import { TokensInterface } from "../interface/services.interface";

class Tokens {
  public GenerateTokens = async (
    user: IUser,
    {
      access = false,
      refresh = false,
      temp = false,
    }: { access?: Boolean; refresh?: Boolean; temp?: Boolean }
  ): Promise<{
    tempToken: string;
    accessToken: string;
    refreshToken: string;
  }> => {
    const tokens: TokensInterface = {
      accessToken: "",
      refreshToken: "",
      tempToken: "",
    };
    if (access) tokens.accessToken = await user.generateAccessToken();
    if (refresh) tokens.refreshToken = await user.generateRefreshToken();
    if (temp) tokens.tempToken = await user.generateTempToken();

    return tokens;
  };

  public VerifyToken = async ({
    accessToken = "",
    refreshToken = "",
    tempToken = "",
  }: {
    accessToken?: string;
    refreshToken?: string;
    tempToken?: string;
  }) => {
    if (tempToken) return await verify(tempToken, process.env.TEMP_TOKEN_KEY);

    if (refreshToken)
      return await verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    if (accessToken) {
      const tokenPayload: any = await verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY
      );
      tokenPayload.flag = true;
      return tokenPayload;
    }
  };
}

export default Tokens;
