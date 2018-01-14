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

describe('GET /api/invitationAccessControl', () => {
  it('should return 200 for valid parameters', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ primaryEmail: 'p', username: 'u', teamId: 1 })
      .expect(200);

    await ag2
      .get('/api/invitationAccessControl')
      .expect(200);
  });

  it('should return 403 if primaryEmail is missing', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ username: 'u', teamId: 1 })
      .expect(200);

    await ag2
      .get('/api/invitationAccessControl')
      .expect(403, {
        meta: {
          code: 403,
          message: 'You must login with your github account.',
        },
      });
  });

  it('should return 403 if username is missing', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ primaryEmail: 'p', teamId: 1 })
      .expect(200);

    await ag2
      .get('/api/invitationAccessControl')
      .expect(403, {
        meta: {
          code: 403,
          message: 'You must login with your github account.',
        },
      });
  });

  it('should return 403 if teamId is missing', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ primaryEmail: 'p', username: 'u' })
      .expect(200);

    await ag2
      .get('/api/invitationAccessControl')
      .expect(403, {
        meta: {
          code: 403,
          message: 'Ask administrator for invitation link',
        },
      });
  });

  context('when IP address access control exists', () => {
    it('should return 200 if IP address is allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          primaryEmail: 'p',
          username: 'u',
          teamId: 1,
          ipAddresses: '127.0.0.1\n192.168.160.1',
        })
        .expect(200);

      await ag2
        .get('/api/invitationAccessControl')
        .set('X-Forwarded-For', '192.168.160.1')
        .expect(200);
    });
    it('should return 403 if IP address is not allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          primaryEmail: 'p',
          username: 'u',
          teamId: 1,
          ipAddresses: 'ip1\nip2',
        })
        .expect(200);

      await ag2
        .get('/api/invitationAccessControl')
        .expect(403, {
          meta: {
            code: 403,
            message: 'Your IP address must be one of [ip1, ip2]',
          },
        });
    });
  });
  context('when email domain access control exists', () => {
    it('should return 200 if primaryEmail is allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          primaryEmail: 'test@takkyuuplayer.com',
          username: 'u',
          teamId: 1,
          emailDomains: 'takkyuuplayer.com\ngmail.com',
        })
        .expect(200);

      await ag2
        .get('/api/invitationAccessControl')
        .expect(200);
    });
    it('should return 403 if primaryEmail is not allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          primaryEmail: 'test@yahoo.com',
          username: 'u',
          teamId: 1,
          emailDomains: 'takkyuuplayer.com\ngmail.com',
        })
        .expect(200);

      await ag2
        .get('/api/invitationAccessControl')
        .expect(403, {
          meta: {
            code: 403,
            message: 'Your primary email must have one of [takkyuuplayer.com, gmail.com] (sub)domain(s)',
          },
        });
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
