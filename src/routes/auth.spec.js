import assert from 'power-assert';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import app from 'entries/backend';
import { slurpJSON } from '../utils';

const agent = request.agent(app);

app.post('/test/session', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  req.session = req.body;
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
  return;
  it('should return 403 for non admin user', async () => {
    await agent
      .get('/api/orgs')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403);
  });
  it('should return 200 with organizations for admin user', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ isAdmin: true })
      .expect(200);

    const orgs = slurpJSON('cache/orgs.json');

    await ag2
      .get('/api/orgs')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        meta: {
          code: HttpStatus.OK,
          message: 'OK',
        },
        data: orgs,
      });
  });
});
