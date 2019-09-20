import { Socket } from 'socket.io';
import { UserProfile } from '../database/models';
import * as jwt from 'jsonwebtoken';
import { Unauthorized } from 'http-errors';
import { userInfo } from 'os';

export const connectMiddleware = async (socket: Socket, next) => {
  try {
    console.log('ahihihihiihihi1234');
    const token = jwt.decode(socket.handshake.query.token);
    const error = new Unauthorized();
    if (!token) {
      throw error;
    }
    const user = await UserProfile.find({
      userId: token['id']
    });
    if (!user) {
      throw error;
    }
    const rs = await UserProfile.update({
      connectUuid: socket.handshake.query.conn_uuid
    }, {
        when: {
        userId: token['id']
      }
    });
    next();
  } catch (e) {
    next(e);
  }
};
