import * as crypto from 'crypto';

/**
 * Hash password function
 * @param text password text
 */
export const hashPassword = (text: string): string => {
  const salt = crypto.randomBytes(16).toString();
  const hash = crypto.pbkdf2Sync(text, salt, 1000, 64, 'sha512').toString('hex');
  return hash;
};

/**
 * Compare valid password
 * @param password password request
 * @param targetCompare password database
 */
export const comparePassword = (password: string, targetCompare: string): boolean => {
  return hashPassword(password) === targetCompare;
};
