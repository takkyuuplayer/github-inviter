import express from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import Github from 'webService/github';
import includes from 'lodash/includes';
import some from 'lodash/some';
import isUndefined from 'lodash/isUndefined';
import { slurpJSON } from '../utils';
import { signingSecret } from '../config';


const router = express.Router();
const ws = new Github();

const teams = slurpJSON('cache/teams.json');

router.all('/', (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');

  next();
});

router.get('/teams', (req, res) => {
  if (req.session.isAdmin) {
    res.send({
      meta: {
        code: HttpStatus.OK,
        message: 'OK',
      },
      data: teams,
    });

    return;
  }
  res.status(HttpStatus.FORBIDDEN).send({
    meta: {
      code: HttpStatus.FORBIDDEN,
      message: 'Only admin can access',
    },
  });
});

router.post('/sign', (req, res) => {
  if (req.session.isAdmin) {
    res.send({
      meta: {
        code: HttpStatus.OK,
        message: 'OK',
      },
      data: jwt.sign(req.body, signingSecret),
    });
    return;
  }

  res.send({
    meta: {
      code: HttpStatus.FORBIDDEN,
      message: 'Only admin can access',
    },
  });
});

router.get('/session', (req, res) => {
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

const invitationAccessControl = (req, res, next) => {
  if (!req.session.username || !req.session.primaryEmail) {
    res.status(HttpStatus.FORBIDDEN).send({
      meta: {
        code: HttpStatus.FORBIDDEN,
        message: 'You must login with your github account.',
      },
    });
    return;
  }

  if (!req.session.teamId) {
    res.status(HttpStatus.FORBIDDEN).send({
      meta: {
        code: HttpStatus.FORBIDDEN,
        message: 'Ask administrator for invitation link',
      },
    });
    return;
  }

  const allowedIp = req.session.ipAddresses ?
    req.session.ipAddresses.split(/\r\n|\r|\n/) : undefined;

  if (!isUndefined(allowedIp) && !includes(allowedIp, req.ip)) {
    res.status(HttpStatus.FORBIDDEN).send({
      meta: {
        code: HttpStatus.FORBIDDEN,
        message: `Your IP address must be one of [${allowedIp.join(', ')}]`,
      },
    });
    return;
  }

  const allowedDomains = req.session.emailDomains ?
    req.session.emailDomains.split(/\r\n|\r|\n/) : undefined;

  if (!isUndefined(allowedDomains)
    && !some(allowedDomains, domain => req.session.primaryEmail.endsWith(domain))
  ) {
    res.status(HttpStatus.FORBIDDEN).send({
      meta: {
        code: HttpStatus.FORBIDDEN,
        message: `Your primary email must have one of [${allowedDomains.join(', ')}] (sub)domain(s)`,
      },
    });
    return;
  }

  next();
};

router.get(
  '/invitationAccessControl',
  invitationAccessControl,
  (req, res) => {
    res.send({
      meta: {
        code: HttpStatus.OK,
        message: 'OK',
      },
    });
  },
);

router.all(
  '/join',
  invitationAccessControl,
  async (req, res) => {
    const invitation = ws.createTeamInvitationRequest(
      req.session.teamId,
      req.session.username,
    );
    try {
      const invited = await ws.sendRequest(invitation);
      res.send({
        meta: {
          code: 200,
          message: 'OK',
        },
        data: invited,
      });
    } catch (e) {
      console.error(e);
    }
  },
);

export default router;
