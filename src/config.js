export const signingSecret = (process.env.SIGNING_SECRET || 'replace.me');

export const github = {
  personalToken: (process.env.GH_PERSONAL_TOKEN || 'replace.me'),
  clientId: (process.env.GH_BASIC_CLIENT_ID || 'replace.me'),
  clientSecret: (process.env.GH_BASIC_CLIENT_SECRET || 'replace.me'),
};
