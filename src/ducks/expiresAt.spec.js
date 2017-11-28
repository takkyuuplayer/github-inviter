import assert from 'power-assert';

import reducer, { setExpiresAt } from './expiresAt';

describe('ducks/expiresAt', () => {
  describe('setExpiresAt', () => {
    it('should return SET_EXPIRES_AT', () => {
      assert.deepStrictEqual(setExpiresAt('2017-06-01 12:00:00'), {
        type: 'SET_EXPIRES_AT',
        expiresAt: '2017-06-01 12:00:00',
      });
    });
  });
  describe('reducer', () => {
    it('should return initial state', () => {
      assert.strictEqual(reducer(undefined, {}), '');
    });

    it('should handle SET_EXPIRES_AT action', () => {
      assert.strictEqual(
        reducer(undefined, setExpiresAt('2017-06-01 12:00:00')),
        1496332800,
      );
    });

    it('should ignore SET_EXPIRES_AT action for invalid data', () => {
      assert.strictEqual(
        reducer(1496286000, setExpiresAt('2')),
        1496286000,
      );
    });
  });
});
