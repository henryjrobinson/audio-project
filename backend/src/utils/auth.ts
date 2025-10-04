import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (payload: { id: string; email: string }): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const generateRefreshToken = (payload: { id: string; email: string }): string => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

export const verifyAccessToken = (token: string): { id: string; email: string } => {
  return jwt.verify(token, config.jwt.secret) as { id: string; email: string };
};

export const verifyRefreshToken = (token: string): { id: string; email: string } => {
  return jwt.verify(token, config.jwt.refreshSecret) as { id: string; email: string };
};