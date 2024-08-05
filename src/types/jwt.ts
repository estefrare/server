import jwt from 'jsonwebtoken';

export interface IDecodedToken extends jwt.JwtPayload {
  timestamp: string;
  creator: string;
}
