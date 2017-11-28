const SELECT_ORGANIZATION = 'SELECT_ORGANIZATION';

export const selectOrganization = organizationId => ({
  type: SELECT_ORGANIZATION,
  organizationId,
});

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_ORGANIZATION:
      return action.organizationId;
    default:
      return state;
  }
};
