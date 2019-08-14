import { BaseController } from '../core/controller';
import { BaseUrl, Post } from '../core/decorators/httpDecorator';
import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import * as createError from 'http-errors';
import { generateToken } from '../shared/jwt';
import { validateUserRegister } from '../shared/validator/auth';
import { UserCredential } from '../database/models/userCredential';
import { BodyResponse } from '../shared/serialiazer';
import constraint from '../shared/constraint';
import { hashPassword } from '../shared/hash';

@BaseUrl({
  prefix: '/api/auth',
})
export class AuthController extends BaseController {

  @Post({
    path: '/token/register'
  })
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

  @Post({
    path: '/user/register',
    middlewares: [
      validateUserRegister
    ]
  })
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await UserCredential.save(UserCredential.create({
        email: req.body.email,
        password: hashPassword(req.body.password)
      }));
      this.logger.info('create user success');
      res.json(new BodyResponse(constraint.http.status[200]));
      res.end();
    } catch (e) {
      next(e);
    }
  }
}
