import * as express from 'express';
import 'reflect-metadata';
import { TestController } from './controllers/test';
import { loadHandlerWithRoute } from './core/decorators/httpDecorator';

const app = express();

loadHandlerWithRoute({
  app,
  controllers: [
    TestController
  ]
});

app.listen(3000, () => {});
