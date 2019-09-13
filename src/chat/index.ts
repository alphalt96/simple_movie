import * as socketIO from 'socket.io';
import { Server } from 'http';
import { logger } from '../shared/logger';
import { authSocketMiddleware } from '../middlewares/authenticator';

export const initSocket = (http: Server) => {
  return socketIO({
    path: process.env.SOCKET_PATH
  }).listen(http)
    .origins(['*:*']);
};

export const loadSocketApp = (http: Server) => {
  const io = initSocket(http);

  // load middleware
  io.use(authSocketMiddleware);

  io.on('connection', (socket) => {
    logger.info('connection establish');

    socket.on('initConnection', (data) => {
      console.log(data);
    });
  });
};
