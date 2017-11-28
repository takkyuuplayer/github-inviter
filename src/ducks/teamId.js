import { SET_TEAMS } from './teams';

export const SELECT_TEAM = 'SELECT_TEAM';

export const selectTeam = teamId => ({
  type: SELECT_TEAM,
  teamId,
});

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_TEAM:
      return action.teamId;
    case SET_TEAMS:
      return null;
    default:
      return state;
  }
};
