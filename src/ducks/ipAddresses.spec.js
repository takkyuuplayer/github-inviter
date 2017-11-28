import assert from 'power-assert';

import reducer, { setIpAddresses } from './ipAddresses';

describe('ducks/ipAddresses', () => {
  describe('setIpAddresses', () => {
    it('should return SET_IP_ADDRESSES', () => {
      assert.deepStrictEqual(setIpAddresses('test'), {
        type: 'SET_IP_ADDRESSES',
        text: 'test',
      });
    });
  });
  describe('reducer', () => {
    it('should return initial state', () => {
      assert.strictEqual(reducer(undefined, {}), '');
    });
    it('should handle SET_IP_ADDRESSES action', () => {
      assert.strictEqual(
        reducer(undefined, setIpAddresses('test')),
        'test',
      );
    });
  });
});
