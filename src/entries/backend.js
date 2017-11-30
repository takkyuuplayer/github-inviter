import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';

import auth from 'routes/auth';
import cookieSession from 'middlewares/cookieSession';
import csrf from 'middlewares/csrf';

import { pathTo } from 'utils';

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(cookieSession);
app.use(csrf);

app.use('/auth', auth);
app.use(express.static(pathTo('build')));
app.use('/*', express.static(path.join(pathTo('build'), 'index.html')));

export default app;
