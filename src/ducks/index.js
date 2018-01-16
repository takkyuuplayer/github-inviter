import { combineReducers } from 'redux';
import expiresAt from 'ducks/expiresAt';
import emailDomains from 'ducks/emailDomains';
import teams from 'ducks/teams';
import teamId from 'ducks/teamId';
import ipAddresses from 'ducks/ipAddresses';

export default combineReducers({
  teams,
  emailDomains,
  teamId,
  expiresAt,
  ipAddresses,
});
