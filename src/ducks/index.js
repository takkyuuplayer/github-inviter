import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import expiresAt from 'ducks/expiresAt';
import emailDomains from 'ducks/emailDomains';
import teams from 'ducks/teams';
import teamId from 'ducks/teamId';
import ipAddresses from 'ducks/ipAddresses';

export default combineReducers({
  routing: routerReducer,
  teams,
  emailDomains,
  teamId,
  expiresAt,
  ipAddresses,
});
