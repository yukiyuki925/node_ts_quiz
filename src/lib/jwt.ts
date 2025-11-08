import * as jwt from "jsonwebtoken";

// JWTトークン作成
export const encodeJwt = (userId: string): string => {
  return jwt.sign(userId, _getJwtSecret());
};

// トークン検証
export const decodeJwt = (token: string): string => {
  return jwt.verify(token, _getJwtSecret()) as string;
};

// .envからシークレットキーを取得
const _getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Set JWT_SECRET in .env");
  return secret;
};
