import * as express from 'express';
import { AuthRouter } from './routers/auth_router';
import { Logger } from './core/logger';

const app = express();

const logger = new Logger();
const authRoute = new AuthRouter(logger);
app.use('/auth', authRoute.router);

app.listen(3000, () => {
    console.log('running ok');
});
