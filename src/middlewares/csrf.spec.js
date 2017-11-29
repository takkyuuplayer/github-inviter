import express from 'express';
import assert from 'power-assert';
import request from 'request-promise';
import cookieSession from 'cookie-session';

import csrf from './csrf';

describe('middlewares/csrf', () => {
  describe('app', () => {
    const app = express();
    app.use(cookieSession({
      name: 'session',
      keys: ['secret'],
      cookie: {
        secure: true,
        httpOnly: true,
      },
    }));
    app.use(csrf);

    it('should store csrf token in session', async () => {
      app.get('/', (req, res) => {
        assert(req.session.csrf);

        res.send('Hello World!');
      });

      app.listen(3000, () => {});

      await request('http://localhost:3000');
    });
  });
});

