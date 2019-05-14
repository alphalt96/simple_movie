import { IController } from "../core/controller";
import { Logger } from "../core/logger";

export class AuthController implements IController {
  constructor(public logger: Logger) { }

  test(req, res) {
    this.logger.debug('coincard');
    res.send('ahihi');
  }
}