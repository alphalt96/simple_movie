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
import * as http from 'http';
import { loadSocketApp } from './chat';
import * as cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

// import controller into router
loadHandlerWithRoute({
  app,
  controllers: [
    TestController,
    AuthController
  ]
});

loadSocketApp(httpServer);

// use errorHandler middleware
app.use(errorHandler);

const port = process.env.SERVER_PORT || 3000;
httpServer.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
