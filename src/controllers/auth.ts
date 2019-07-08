import { BaseController } from '../core/controller';
import { BaseUrl, Post } from '../core/decorators/httpDecorator';
import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import { logger } from '../shared/logger';
import * as createError from 'http-errors';
import { generateToken } from '../shared/jwt';

@BaseUrl({
  prefix: '/auth',
})
export class AuthController extends BaseController {

  @Post('/token/register')
  login(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info(`handling api ${req.method} - ${req.originalUrl}`);
      const token = generateToken({
        id: 1,
      });
      res.status(200).json({
        token
      });
    } catch (e) {
      next(e);
    }
  }
}
