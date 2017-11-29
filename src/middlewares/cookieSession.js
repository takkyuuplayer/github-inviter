import cookieSession from 'cookie-session';

import { signingSecret } from '../config';

export default cookieSession({
  name: 'session',
  keys: [signingSecret],
  cookie: {
    secure: true,
    httpOnly: true,
  },
});
