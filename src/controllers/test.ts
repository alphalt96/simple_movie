import { Get, BaseUrl, Post } from '../core/decorators/httpDecorator';
import { BaseController } from '../core/controller';

@BaseUrl({
  prefix: '/api'
})
export class TestController extends BaseController {

  @Get('/test')
  test(req, res) {
    res.send('test cai coin card a`');
  }

  @Post('/ahihi')
  test2(req, res) {
    console.log('ahihi');
    res.send('ahihi')
  }
}
