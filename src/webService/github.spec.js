import http from 'http';
import assert from 'power-assert';
import urijs from 'urijs';

import Github from './github';

describe('webService/github', () => {
  describe('instance', () => {
    it('should have github id,token from env', () => {
      const ws = new Github();

      assert.strictEqual(ws.personalToken, process.env.GH_PERSONAL_TOKEN);
      assert.strictEqual(ws.clientId, process.env.GH_CLIENT_ID);
      assert.strictEqual(ws.clientSecret, process.env.GH_CLIENT_SECRET);
      assert(ws.apiEndPoints);
    });
    it('can set property', () => {
      const ws = new Github({
        clientId: 'foobar',
      });

      assert.strictEqual(ws.personalToken, process.env.GH_PERSONAL_TOKEN);
      assert.strictEqual(ws.clientId, 'foobar');
      assert.strictEqual(ws.clientSecret, process.env.GH_CLIENT_SECRET);
    });
    it('should be freezed', () => {
      const ws = new Github();

      assert.throws(() => { ws.clientId = 'hige'; });
    });
  });

  describe('signInLink', () => {
    const ws = new Github();
    const link = ws.signInLink('csrf');

    assert(link instanceof urijs);
    assert.strictEqual(link.protocol(), 'https');
    assert.strictEqual(link.host(), 'github.com');
    assert.strictEqual(link.path(), '/login/oauth/authorize');
    assert.deepStrictEqual(link.search(true), {
      client_id: ws.clientId,
      state: 'csrf',
      scope: 'user:email',
    });
  });

  const ws = new Github();

  describe('createAuthorizationRequest', () => {
    it('should return request', () => {
      const req = ws.createAuthorizationRequest('code');
      assert.deepStrictEqual(req, {
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        form: {
          client_id: ws.clientId,
          client_secret: ws.clientSecret,
          code: 'code',
        },
      });
    });
  });

  describe('createTeamInvitationRequest', () => {
    it('should return request', () => {
      const req = ws.createTeamInvitationRequest(100, 'uname');
      assert.deepStrictEqual(req, {
        method: 'PUT',
        uri: 'https://api.github.com/teams/100/memberships/uname',
      });
    });
  });

  describe('sendRequest', () => {
    it('should send request ', async () => {
      const server = http.createServer((req, res) => {
        assert.deepStrictEqual(
          req.headers,
          {
            authorization: `token ${ws.personalToken}`,
            'user-agent': 'Request-Promise',
            host: '127.0.0.1:15000',
            connection: 'close',
          },
        );
        res.end('{"mocked":"response"}');
      });
      server.listen(15000);

      const json = await ws.sendRequest({ uri: 'http://127.0.0.1:15000', some: 'option' });

      assert.strictEqual(json, '{"mocked":"response"}');

      server.close();
    });
  });
});
