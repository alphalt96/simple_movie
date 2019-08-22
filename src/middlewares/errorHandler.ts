import { Request, Response, response } from 'express';
import { NextFunction } from 'connect';
import { HttpError } from 'http-errors';
import { logger } from '../shared/logger';
import { BodyResponse } from '../shared/serialiazer';
import constraint from '../shared/constraint';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  if (!err.status) {
    logger.error(err);
  }
  const responseData = new BodyResponse(constraint.http.status[500]);
  responseData.message = err instanceof HttpError ? err.message : 'Internal Server Error';
  if (err.errorFields) {
    responseData.errors = err.errorFields;
  }
  res.status(status).json(responseData);
};
