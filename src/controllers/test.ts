import { Get, BaseUrl, Post } from '../core/decorators/httpDecorator';
import { BaseController } from '../core/controller';
import * as cassandra from 'cassandra-driver';
import { UserCredential, UserProfile } from '../database/models/user';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { authMiddleware } from '../middlewares/authenticator';

@BaseUrl({
  prefix: '/api'
})
export class TestController extends BaseController {

  @Get({
    path: '/test',
    middlewares: [
      authMiddleware
    ]
  })
  async test(req: Request, res) {
    res.send('test cai coin card a`');
  }

  @Post({
    path: '/ahihi'
  })
  test2(req, res) {
    res.send('ahihi');
  }
}
