import { Logger } from "./logger";
import { IController } from "./controller";
import { AuthController } from "../controllers/auth_controller";
import { Router } from "express";

export interface IRouter {
  logger: Logger;
  controller: IController
  router: Router
  load: () => void
}

export interface IRouterInstance {
  new(logger: Logger): IRouter;
}

export abstract class BaseRouter implements IRouter {
  private _controller;
  private _logger;
  private _router;
  private _prefix;

  constructor(logger: Logger) {
    this.logger = logger;
    this.router = Router();
  }

  get controller(): AuthController {
    return this._controller;
  }

  set controller(c: AuthController) {
    this._controller = c;
  }

  get logger(): Logger {
    return this._logger;
  }

  set logger(logger: Logger) {
    this._logger = logger;
  }

  get router(): Router {
    return this._router;
  }

  set router(router: Router) {
    this._router = router;
  }

  get prefix(): string {
    return this._prefix;
  }

  set prefix(path: string) {
    this._prefix = path;
  }

  abstract load();
}
