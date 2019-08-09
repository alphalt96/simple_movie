import { Get, BaseUrl, Post } from '../core/decorators/httpDecorator';
import { BaseController } from '../core/controller';

@BaseUrl({
  prefix: '/api'
})
export class TestController extends BaseController {

  @Get({
    path: '/test'
  })
  test(req, res) {
    res.send('test cai coin card a`');
  }

  @Post({
    path: '/ahihi'
  })
  test2(req, res) {
    res.send('ahihi');
  }
}
