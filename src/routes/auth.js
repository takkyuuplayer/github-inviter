import express from 'express';
import HttpStatus from 'http-status-codes';
import urijs from 'urijs';
import uuid from 'uuid';

import Github from 'webService/github';
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

router.post('/github/callback', async (req, res) => {
  const { state } = req.session;
  delete req.session.state;

  if (req.body.state !== state) {
    return res.redirect('/');
  }

  const query = await ws.sendRequest(ws.createAuthorizationRequest(req.body.code));
  const params = urijs.parseQuery(query);
  const gh = new Github({
    personalToken: params.access_token,
  });
  const [user, emails] = await Promise.all([
    gh.sendRequest({ method: 'GET', uri: githubEndpoints.current_user_url }),
    gh.sendRequest({ method: 'GET', uri: githubEndpoints.emails_url }),
  ]).then(responses => responses.map(response => JSON.parse(response.body)));

  const username = user.login;
  const primaryEmail = emails.filter(emailInfo =>
    emailInfo.primary && emailInfo.verified)[0].email;

  req.session = Object.assign({}, req.session, {
    username,
    primaryEmail,
    isAdmin: (username === admin.login),
  });

  return res.send({
    meta: { code: HttpStatus.OK, message: 'OK' },
    data: {
      username: req.session.username,
      primaryEmail: req.session.primaryEmail,
      isAdmin: req.session.isAdmin,
    },
  });
});

export default router;
