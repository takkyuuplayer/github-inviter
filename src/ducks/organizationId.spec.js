import assert from 'power-assert';

import reducer, { selectOrganization } from './organizationId';

describe('ducks/organizationId', () => {
  describe('selectOrganization', () => {
    it('should return SELECT_ORGANIZATION action', () => {
      assert.deepStrictEqual(selectOrganization(1), {
        type: 'SELECT_ORGANIZATION',
        organizationId: 1,
      });
    });
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      assert.strictEqual(reducer(undefined, {}), null);
    });

    it('should handle SELECT_ORGANIZATION action', () => {
      const action = selectOrganization(1);

      assert.strictEqual(reducer(undefined, action), 1);
    });
  });
});
