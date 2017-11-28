const SET_EMAIL_DOMAINS = 'SET_EMAIL_DOMAINS';

export const setEmailDomains = text => ({
  type: SET_EMAIL_DOMAINS,
  text,
});

export default (state = '', action) => {
  switch (action.type) {
    case SET_EMAIL_DOMAINS:
      return action.text;
    default:
      return state;
  }
};
