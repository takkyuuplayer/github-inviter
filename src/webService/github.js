import freeze from 'deep-freeze';
import urijs from 'urijs';
import rp from 'request-promise';
import merge from 'lodash/merge';
import isString from 'lodash/fp/isString';
import { slurpJSON } from '../utils';
import { github as config } from '../config';

const AUTHOLIZATION_URL = 'https://github.com/login/oauth/authorize';
const LOGIN_URL = 'https://github.com/login/oauth/access_token';
const API_BASE_URL = 'https://api.github.com';

const SCOPE = 'user:email';

export default class github {
  constructor({
    personalToken = config.personalToken,
    clientId = config.clientId,
    clientSecret = config.clientSecret,
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

  createTeamInvitationRequest = (teamId, username) => ({
    method: 'PUT',
    uri: `${API_BASE_URL}/teams/${teamId}/memberships/${username}`,
  })

  sendRequest = request => rp(merge({}, this.headers(), request))
}
