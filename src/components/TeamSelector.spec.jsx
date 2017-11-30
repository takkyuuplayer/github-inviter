import assert from 'power-assert';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TeamSelector from './TeamSelector';

const teams = [
  {
    id: 1,
    org: 'tp-organization',
    name: 'viewers',
    slug: 'developers',
    url: 'https://api.github.com/teams/1',
  },
  {
    id: 1,
    org: 'tp-organization',
    name: 'viewers',
    slug: 'viewers',
    url: 'https://api.github.com/teams/2',
  },
];

const props = {
  teams,
  handleSelectTeam: sinon.spy(),
};

describe('components/TeamSelector', () => {
  const wrapper = shallow(<TeamSelector {...props} />);

  it('should return select tag', () => {
    assert.strictEqual(wrapper.find('select').length, 1);
    assert.strictEqual(wrapper.find('option').length, 3);
  });

  describe('select', () => {
    it('should trigger handleSelectTeam on change', () => {
      assert.strictEqual(props.handleSelectTeam.calledWith(props.teams[0]), false);
      assert.strictEqual(props.handleSelectTeam.calledWith(props.teams[1]), false);

      wrapper.find('select').simulate('change', { target: { value: '1' } });

      assert.strictEqual(props.handleSelectTeam.calledWith(props.teams[0]), false);
      assert.strictEqual(props.handleSelectTeam.calledWith(props.teams[1]), true);

      wrapper.find('select').simulate('change', { target: { value: '0' } });

      assert.strictEqual(props.handleSelectTeam.calledWith(props.teams[0]), true);
      assert.strictEqual(props.handleSelectTeam.calledWith(props.teams[1]), true);
    });
  });
});

