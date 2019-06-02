import { Logger } from './logger';

export interface Controller {
  logger: Logger;
}

export interface ControllerInstance {
  new(): Controller;
}

export class BaseController implements Controller {
  logger: Logger;
}
