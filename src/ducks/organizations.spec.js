import assert from 'power-assert';

import reducer, { setOrganizations } from './organizations';

describe('ducks/organizations', () => {
  describe('setOrganizations', () => {
    it('should return SET_ORGANIZATIONS action', () => {
      assert.deepStrictEqual(setOrganizations(['org1', 'org2']), {
        type: 'SET_ORGANIZATIONS',
        organizations: ['org1', 'org2'],
      });
    });
  });
  describe('reducer', () => {
    it('should return inital state', () => {
      assert.deepStrictEqual(reducer(undefined, {}), []);
    });

    it('should handle SET_ORGANIZATIONS action', () => {
      const action = setOrganizations([1, 2, 3]);

      assert.deepStrictEqual(reducer(undefined, action), [1, 2, 3]);
    });
  });
});
