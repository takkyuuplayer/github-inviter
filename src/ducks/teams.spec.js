import assert from 'power-assert';

import reducer, { setTeams } from './teams';

describe('ducks/teams', () => {
  describe('setTeams', () => {
    it('should return SET_TEAMS action', () => {
      assert.deepStrictEqual(setTeams(['org1', 'org2']), {
        type: 'SET_TEAMS',
        teams: ['org1', 'org2'],
      });
    });
  });
  describe('reducers/teams', () => {
    it('should return inital state', () => {
      assert.deepStrictEqual(reducer(undefined, {}), []);
    });

    it('should handle SET_TEAMS action', () => {
      const action = setTeams([1, 2, 3]);

      assert.deepStrictEqual(reducer(undefined, action), [1, 2, 3]);
    });
  });
});
