import { Get, BaseUrl, Post } from '../core/decorators/httpDecorator';
import { BaseController } from '../core/controller';
import * as cassandra from 'cassandra-driver';
import { userCredential } from '../database/models/userCredentials';

@BaseUrl({
  prefix: '/api'
})
export class TestController extends BaseController {

  @Get({
    path: '/test'
  })
  async test(req, res) {
    await userCredential.insert({
      email: 'new2@gmail.com',
      password: 'coincard',
      userid: '4ab5fb24-5610-4949-bc48-68619d3c133b'
    });
    res.send('test cai coin card a`');
  }

  @Post({
    path: '/ahihi'
  })
  test2(req, res) {
    res.send('ahihi');
  }
}
