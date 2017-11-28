const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';

export const setOrganizations = organizations => ({
  type: SET_ORGANIZATIONS,
  organizations,
});

export default (state = [], action) => {
  switch (action.type) {
    case SET_ORGANIZATIONS:
      return action.organizations;
    default:
      return state;
  }
};
