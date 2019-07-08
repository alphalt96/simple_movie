import { sign } from 'jsonwebtoken';
import config from '../configs/configVariable';

const jwtConfig = config.jwt;

export const generateToken = (data: any) => {
  return sign(data, jwtConfig.privateKey, {
    algorithm: jwtConfig.alg,
    expiresIn: jwtConfig.exp,
    issuer: jwtConfig.iss
  });
};
