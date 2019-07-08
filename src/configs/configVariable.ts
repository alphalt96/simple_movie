import { readFileSync, readdirSync } from 'fs';
import * as path from 'path';

const config =  {
  log: {
    levels: {
      error: 0,
      warning: 1,
      info: 2,
      debug: 3
    },
    colors: {
      error: 'red',
      warning: 'yellow',
      info: 'green',
      debug: 'blue'
    }
  },
  jwt: {
    privateKey: readFileSync(path.join(process.cwd(), '/pem/jwtRS256.key')),
    publicKey: readFileSync(path.join(process.cwd(), '/pem/jwtRS256.key.pub')),
    alg: process.env.JWT_ALGORITHM,
    exp: process.env.JWT_EXPRIRE,
    iss: process.env.JWT_ISSUER,
    header: process.env.JWT_HEADER
  }
};

export default config;
