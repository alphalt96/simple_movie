import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as createError from 'http-errors';
import { NextFunction } from 'connect';
import constraint from '../constraint';

class HttpBadRequest extends createError.BadRequest {
  constructor(
    public errorFields: string[],
    message: string
  ) {
    super(message);
  }
}

export const validateHandle = (req: Request, res: Response, next: NextFunction) => {
  const errs = validationResult(req);
  if (errs.isEmpty()) return next();
  const errorSet = new Set<string>();
  errs.array().forEach(v => {
    errorSet.add(v.param);
  });
  next(new HttpBadRequest(
    Array.from(errorSet),
    constraint.http.status[400])
  );
};
