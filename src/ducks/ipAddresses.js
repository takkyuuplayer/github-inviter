const SET_IP_ADDRESSES = 'SET_IP_ADDRESSES';

export const setIpAddresses = text => ({
  type: SET_IP_ADDRESSES,
  text,
});

export default (state = '', action) => {
  switch (action.type) {
    case SET_IP_ADDRESSES:
      return action.text;
    default:
      return state;
  }
};
