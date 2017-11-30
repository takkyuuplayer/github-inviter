import assert from 'power-assert';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import app from 'entries/backend';
import { signingSecret } from '../config';
import { slurpJSON } from '../utils';

app.post('/api/test/session', (req, res) => {
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

const agent = request.agent(app);

describe('GET /api/teams', () => {
  it('should return 403 for non admin user', async () => {
    await agent
      .get('/api/teams')
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

    const teams = slurpJSON('cache/teams.json');

    await ag2
      .get('/api/teams')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        meta: {
          code: HttpStatus.OK,
          message: 'OK',
        },
        data: teams,
      });
  });
});

describe('POST /api/sign', () => {
  it('should return 200 with jwt', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ isAdmin: true })
      .expect(200);

    await ag2
      .post('/api/sign')
      .type('form')
      .send({ toBe: 'signed' })
      .expect(200)
      .expect((res) => {
        const params = jwt.verify(res.body.data, signingSecret);

        assert.strictEqual(params.toBe, 'signed');
      });
  });
});

describe('GET /api/session', () => {
  it('should return 200 with current session', async () => {
    await agent.get('/api/session')
      .expect(200)
      .expect((res) => {
        assert.deepStrictEqual(res.body.meta, { code: HttpStatus.OK, message: 'OK' });
        assert(res.body.data.session.csrf);
      });
  });
});
