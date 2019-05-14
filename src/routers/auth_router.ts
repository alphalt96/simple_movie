import { AuthController } from "../controllers/auth_controller";
import { initRouter } from "../core/decorators/router_decorator";
import { Logger } from '../core/logger';
import { BaseRouter } from "../core/router";

@initRouter({
  prefix: '/auth',
  Controller: AuthController
})
export class AuthRouter extends BaseRouter {

  constructor(logger: Logger) {
    super(logger);
    this.load();
  }

  load() {
    return this.router
      .get('/test', (req, res) => this.controller.test(req, res));
  }
}
