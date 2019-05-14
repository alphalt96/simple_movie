import { Logger } from "./logger";
import { IRouter } from "express";

export interface IController {
  logger: Logger;
}

export interface IControllerInstance {
  new(logger: Logger): IController;
}
