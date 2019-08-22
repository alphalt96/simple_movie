import { logger } from '../shared/logger';
import winston = require('winston');

export interface Controller {
  logger: winston.Logger;
}

export interface ControllerInstance {
  new(): Controller;
}

export class BaseController implements Controller {
  logger = logger;
}
