import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = { sub: string; role: string };

export const signToken = (p: JwtPayload) =>
  jwt.sign(p, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions);

export const verifyToken = (t: string) => jwt.verify(t, env.jwtSecret) as JwtPayload;
