// tslint:disable-next-line:no-var-requires
require('dotenv').config();
import * as express from 'express';
import 'reflect-metadata';
import { AuthController } from './controllers/auth';
import { TestController } from './controllers/test';
import { loadHandlerWithRoute } from './core/decorators/httpDecorator';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './shared/logger';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// createConnection().then(() => {
//   logger.info('connection establish');
// }).catch(e => {
//   logger.error('fail to create connection', e);
// });

// import controller into router
loadHandlerWithRoute({
  app,
  controllers: [TestController, AuthController]
});

// use errorHandler middleware
app.use(errorHandler);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
