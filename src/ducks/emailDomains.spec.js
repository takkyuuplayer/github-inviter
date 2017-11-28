import assert from 'power-assert';

import reducer, { setEmailDomains } from './emailDomains';

describe('ducks/emailDomains', () => {
  describe('setEmailDomains', () => {
    it('should return SET_EMAIL_DOMAINS action', () => {
      assert.deepStrictEqual(setEmailDomains('test'), {
        type: 'SET_EMAIL_DOMAINS',
        text: 'test',
      });
    });
  });
  describe('reducer', () => {
    it('should return initial state', () => {
      assert.strictEqual(reducer(undefined, {}), '');
    });
    it('should handle SET_EMAIL_DOMAINS action', () => {
      assert.strictEqual(
        reducer(undefined, setEmailDomains('test')),
        'test',
      );
    });
  });
});
