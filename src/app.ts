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
import * as socket from 'socket.io';
import * as http from 'http';

const app = express();
const httpServer = http.createServer(app);

const io = socket(httpServer);

app.use(bodyParser.urlencoded({ extended: false }));

// import controller into router
loadHandlerWithRoute({
  app,
  controllers: [
    TestController,
    AuthController
  ]
});

io.on('connection', (socket) => {
  console.log('connected');
});

// use errorHandler middleware
app.use(errorHandler);

const port = process.env.SERVER_PORT || 3000;
httpServer.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
