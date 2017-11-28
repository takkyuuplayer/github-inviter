export const SET_TEAMS = 'SET_TEAMS';

export const setTeams = teams => ({
  type: SET_TEAMS,
  teams,
});

export default (state = [], action) => {
  switch (action.type) {
    case SET_TEAMS:
      return action.teams;
    default:
      return state;
  }
};
