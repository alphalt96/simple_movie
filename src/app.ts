// tslint:disable-next-line:no-var-requires
require('dotenv').config();
import * as express from 'express';
import 'reflect-metadata';
import { AuthController } from './controllers/auth';
import { TestController } from './controllers/test';
import { loadHandlerWithRoute } from './core/decorators/httpDecorator';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './shared/logger';

const app = express();

// import controller into router
loadHandlerWithRoute({
  app,
  controllers: [
    TestController,
    AuthController
  ]
});

// use errorHandler middleware
app.use(errorHandler);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
