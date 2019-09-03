import { Request, Response, NextFunction } from 'express';
import { UserProfile, UserCredential } from '../database/models';
import * as jwt from 'jsonwebtoken';
import * as createError from 'http-errors';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = jwt.decode(req.header('Authorization').split(' ')[1]);
    if (!token) {
      throw createError(401, 'Unauthenticated');
    }
    const user = await UserCredential.find({
      id: token['id']
    });
    if (!user) {
      throw createError(401, 'Unauthenticated');
    }
    next();
  } catch (e) {
    next(e);
  }
};
