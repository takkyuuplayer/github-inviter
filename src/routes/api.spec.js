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

describe('GET /api/checkLogin', () => {
  it('should return 200 for valid session', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ primaryEmail: 'p', username: 'u' })
      .expect(200);

    await ag2
      .get('/api/checkLogin')
      .expect(200);
  });

  it('should return 403 if primaryEmail is missing', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ username: 'u' })
      .expect(200);

    await ag2
      .get('/api/checkLogin')
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
      .send({ primaryEmail: 'p' })
      .expect(200);

    await ag2
      .get('/api/checkLogin')
      .expect(403, {
        meta: {
          code: 403,
          message: 'You must login with your github account.',
        },
      });
  });
});

describe('GET /api/checkInvitation', () => {
  it('should return 200 if teamId exists', async () => {
    const ag2 = request.agent(app);

    await ag2
      .post('/api/test/session')
      .type('form')
      .send({ teamId: 1 })
      .expect(200);

    await ag2
      .get('/api/checkInvitation')
      .expect(200);
  });
  it('should return 403 if teamId is missing', async () => {
    const ag2 = request.agent(app);

    await ag2
      .get('/api/checkInvitation')
      .expect(403, {
        meta: {
          code: 403,
          message: 'Ask administrator for invitation link',
        },
      });
  });
});

describe('GET /api/accessControl', () => {
  context('when no access control exists', () => {
    it('should return 200', async () => {
      const ag2 = request.agent(app);

      await ag2
        .get('/api/checkAccessControl')
        .expect(200);
    });
  });
  context('when IP address access control exists', () => {
    it('should return 200 if IP address is allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          ipAddresses: '127.0.0.1\n192.168.160.1',
        })
        .expect(200);

      await ag2
        .get('/api/checkAccessControl')
        .set('X-Forwarded-For', '192.168.160.1')
        .expect(200);
    });
    it('should return 403 if IP address is not allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          ipAddresses: 'ip1\nip2',
        })
        .expect(200);

      await ag2
        .get('/api/checkAccessControl')
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
          emailDomains: 'takkyuuplayer.com\ngmail.com',
        })
        .expect(200);

      await ag2
        .get('/api/checkAccessControl')
        .expect(200);
    });
    it('should return 403 if primaryEmail is not allowed', async () => {
      const ag2 = request.agent(app);

      await ag2
        .post('/api/test/session')
        .type('form')
        .send({
          primaryEmail: 'test@yahoo.com',
          emailDomains: 'takkyuuplayer.com\ngmail.com',
        })
        .expect(200);

      await ag2
        .get('/api/checkAccessControl')
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
/* */
