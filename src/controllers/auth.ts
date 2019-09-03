import { BaseController } from '../core/controller';
import { BaseUrl, Post } from '../core/decorators/httpDecorator';
import { NextFunction } from 'connect';
import { Response, Request } from 'express';
import * as createError from 'http-errors';
import { generateToken } from '../shared/jwt';
import { validateUserRegister } from '../shared/validator/auth';
import { BodyResponse } from '../shared/serialiazer';
import constraint from '../shared/constraint';
import * as md5 from 'md5';
import * as model from '../database/models';
import { types } from 'cassandra-driver';


@BaseUrl({
  prefix: '/api/auth',
})
export class AuthController extends BaseController {

  @Post({
    path: '/token/register'
  })
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info(`handling api ${req.method} - ${req.originalUrl}`);
      const user = await model.UserCredential.find({
        email: req.body.email,
        password: md5(req.body.password)
      });
      const token = generateToken({
        id: user.toArray()[0].id,
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
      const result = await model.UserCredential.insert({
        id: types.Uuid.random(),
        email: req.body.email,
        password: md5(req.body.password),
        createdAt: types.generateTimestamp()
      });
      if (result.wasApplied()) {
        this.logger.info('create user success');
      }
      res.json(new BodyResponse(constraint.http.status[200]));
      res.end();
    } catch (e) {
      next(e);
    }
  }
}
