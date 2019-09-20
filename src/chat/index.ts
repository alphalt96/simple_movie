import * as socketIO from 'socket.io';
import { Server } from 'http';
import { logger } from '../shared/logger';
import { authSocketMiddleware } from '../middlewares/authenticator';
import { connectMiddleware } from '../middlewares/connection';

export const initSocket = (http: Server) => {
  return socketIO({
    path: process.env.SOCKET_PATH
  }).listen(http)
    .origins(['*:*']);
};

export const loadSocketApp = (http: Server) => {
  const io = initSocket(http);

  // load middleware
  // io.use(authSocketMiddleware);
  io.use(connectMiddleware);

  io.on('connection', (socket) => {
    logger.info('connection establish');
  });
};
