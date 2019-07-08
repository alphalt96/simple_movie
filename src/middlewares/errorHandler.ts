import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import { HttpError } from 'http-errors';
import { logger } from '../shared/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  if (!err.status) {
    logger.error(err);
  }
  const message = err instanceof HttpError ? err.message : 'Internal Server Error';
  res.json({
    status,
    message
  });
};
