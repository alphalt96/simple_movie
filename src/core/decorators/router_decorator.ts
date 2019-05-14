import { IControllerInstance } from "../controller";
import { IRouterInstance } from "../router";
import { Logger } from "../logger";

export function initRouter<T extends { prefix: string, Controller: IControllerInstance }>(params: T) {
  return (
    constructor: IRouterInstance
  ) => {
    const logger = new Logger();
    constructor.prototype.controller = new params.Controller(logger);
    constructor.prototype.prefix = params.prefix;
  }
}
