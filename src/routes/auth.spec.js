import request from 'supertest';

import app from 'entries/backend';

const agent = request.agent(app);

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
