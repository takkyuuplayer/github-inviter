import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import auth from 'routes/auth';
import cookieSession from 'middlewares/cookieSession';
import csrf from 'middlewares/csrf';

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession);
app.use(csrf);

app.use('/auth', auth);

export default app;
