import request from 'supertest';
import assert from 'power-assert';

import app from 'entries/backend';
import jwt from 'jsonwebtoken';

import { signingSecret } from '../config';

const agent = request.agent(app);

app.get('/api/test/session', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({
    meta: {
      code: 200,
      message: 'OK',
    },
    data: {
      session: req.session,
    },
  });
});

describe('GET /auth/github', () => {
  it('should redirect to github sign in link', async () => {
    await agent
      .get('/auth/github')
      .expect(302)
      .expect('Location', /https:\/\/github.com\/login\/oauth\/authorize/);
  });
});

describe('GET /auth/github/callback', () => {
  it('should redirect / if login failed', async () => {
    await agent
      .get('/auth/github/callback')
      .expect(302)
      .expect('Location', '/');
  });
});

describe('GET /auth/token', () => {
  it('should redirect / with setting session', async () => {
    const token = jwt.sign({ test: 'data' }, signingSecret);

    await agent
      .get('/auth/token')
      .query({ token })
      .expect(302)
      .expect('Location', '/');

    await agent.get('/api/session')
      .expect(200)
      .expect((res) => {
        assert.strictEqual(res.body.data.session.test, 'data');
      });
  });
});
