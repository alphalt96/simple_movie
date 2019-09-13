import { Request, Response, NextFunction } from 'express';
import { UserProfile } from '../database/models';
import * as jwt from 'jsonwebtoken';
import { Unauthorized } from 'http-errors';
import { Socket } from 'socket.io';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = jwt.decode(req.header('Authorization').split(' ')[1]);
    const error = new Unauthorized();
    if (!token) {
      throw error;
    }
    const user = await UserProfile.find({
      userId: token['id']
    });
    if (!user) {
      throw error;
    }
    next();
  } catch (e) {
    next(e);
  }
};

export const authSocketMiddleware = async (socket: Socket, next) => {
  try {
    const token = jwt.decode(socket.handshake.query.token);
    const error = new Unauthorized();
    if (!token) {
      throw error;
    }
    const user = await UserProfile.find({
      userId: token['id']
    });
    if (!user) {
      throw error;
    }
    next();
  } catch (e) {
    console.log('ahihihihi', e);
    next(e);
  }
};
