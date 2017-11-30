import express from 'express';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { slurpJSON } from '../utils';
import { signingSecret } from '../config';


const router = express.Router();

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

export default router;
