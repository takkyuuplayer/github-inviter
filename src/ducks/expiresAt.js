import moment from 'moment';

const SET_EXPIRES_AT = 'SET_EXPIRES_AT';

export const setExpiresAt = expiresAt => ({
  type: SET_EXPIRES_AT,
  expiresAt,
});

export default (state = '', action) => {
  switch (action.type) {
    case SET_EXPIRES_AT:
      if (action.expiresAt === '') {
        return '';
      }
      {
        const m = moment(action.expiresAt, 'YYYY-MM-DD HH:mm:ss', true);
        return m.isValid() ? m.unix() : state;
      }
    default:
      return state;
  }
};
