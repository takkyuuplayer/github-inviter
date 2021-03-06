import express from 'express';
import urijs from 'urijs';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';


import Github from 'webService/github';
import { signingSecret } from '../config';
import { slurpJSON } from '../utils';


const router = express.Router();
const ws = new Github();

const admin = slurpJSON('cache/admin.json');
const githubEndpoints = slurpJSON('cache/github.json');

router.get('/github', (req, res) => {
  const state = uuid.v4();

  req.session = Object.assign({}, req.session, {
    state,
  });

  res.redirect(ws.signInLink(state).toString());
});

router.get('/github/callback', async (req, res) => {
  const { state } = req.session;
  delete req.session.state;


  if (req.query.state !== state) {
    return res.redirect('/');
  }

  const query = await ws.sendRequest(ws.createAuthorizationRequest(req.query.code));
  const params = urijs.parseQuery(query);
  const gh = new Github({
    personalToken: params.access_token,
  });
  const [user, emails] = await Promise.all([
    gh.sendRequest({ method: 'GET', uri: githubEndpoints.current_user_url }),
    gh.sendRequest({ method: 'GET', uri: githubEndpoints.emails_url }),
  ]);

  const username = JSON.parse(user).login;
  const primaryEmail = JSON.parse(emails).filter(emailInfo =>
    emailInfo.primary && emailInfo.verified)[0].email;
  const isAdmin = (username === admin.login);

  req.session = Object.assign({}, req.session, {
    username,
    primaryEmail,
    isAdmin,
  });

  return isAdmin ? res.redirect('/admin') : res.redirect('/invitation');
});

router.get('/token', (req, res) => {
  try {
    const params = jwt.verify(req.query.token, signingSecret);
    delete params.iat;
    req.session = Object.assign({}, req.session, params);
  } catch (e) {
    res.send(e.message);
    return;
  }

  res.redirect('/');
});

export default router;
