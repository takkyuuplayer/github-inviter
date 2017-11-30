import freeze from 'deep-freeze';
import urijs from 'urijs';
import rp from 'request-promise';
import merge from 'lodash/merge';
import isString from 'lodash/fp/isString';
import { slurpJSON } from '../utils';

const AUTHOLIZATION_URL = 'https://github.com/login/oauth/authorize';
const LOGIN_URL = 'https://github.com/login/oauth/access_token';

const SCOPE = 'user:email';

export default class github {
  constructor({
    personalToken = process.env.GH_PERSONAL_TOKEN,
    clientId = process.env.GH_BASIC_CLIENT_ID,
    clientSecret = process.env.GH_BASIC_CLIENT_SECRET,
  } = {}) {
    this.personalToken = personalToken;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiEndPoints = slurpJSON('./cache/github.json');

    freeze(this);
  }

  signInLink(state) {
    if (!isString(state)) {
      throw new Error(`state: ${state} should be string`);
    }
    return urijs(AUTHOLIZATION_URL).query({
      client_id: this.clientId,
      state,
      scope: SCOPE,
    });
  }

  headers() {
    return {
      headers: {
        'User-Agent': 'Request-Promise',
        Authorization: `token ${this.personalToken}`,
      },
    };
  }

  createAuthorizationRequest(code) {
    if (!isString(code)) {
      throw new Error(`code: ${code} should be string`);
    }
    return {
      method: 'POST',
      uri: LOGIN_URL,
      form: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      },
    };
  }

  sendRequest = request => rp(merge({}, this.headers(), request))
}
