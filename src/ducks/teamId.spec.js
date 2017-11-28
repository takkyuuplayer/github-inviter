import assert from 'power-assert';

import { setTeams } from './teams';
import reducer, { selectTeam } from './teamId';

describe('ducks/teamId', () => {
  describe('selectTeam', () => {
    it('should return SELECT_TEAM action', () => {
      assert.deepStrictEqual(selectTeam(1), {
        type: 'SELECT_TEAM',
        teamId: 1,
      });
    });
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      assert.strictEqual(reducer(undefined, {}), null);
    });

    it('should handle SELECT_TEAM action', () => {
      const action = selectTeam(1);

      assert.strictEqual(reducer(undefined, action), 1);
    });

    it('should handle SET_TEAMS action', () => {
      const action = setTeams([1, 2, 3]);

      assert.strictEqual(reducer(1, action), null);
    });
  });
});
