import assert from 'power-assert';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ConfirmInvitation from './ConfirmInvitation';

const team = {
  id: 1,
  org: 'tp-organization',
  name: 'viewers',
  slug: 'developers',
  url: 'https://api.github.com/teams/1',
};

const props = {
  team,
  handleJoin: sinon.spy(),
};

describe('components/ConfirmInvitation', () => {
  const wrapper = shallow(<ConfirmInvitation {...props} />);

  it('should include button and link', () => {
    assert.strictEqual(wrapper.find('button').length, 1);
    assert.strictEqual(wrapper.find('a').length, 1);
  });

  describe('button', () => {
    it('should trigger handleClickJoinButt', () => {
      assert.strictEqual(props.handleJoin.called, false);

      wrapper.find('button').simulate('click');

      assert.strictEqual(props.handleJoin.called, true);
    });
  });

  describe('link', () => {
    it('should link to github with target = _blank', () => {
      const link = wrapper.find('a');

      assert.strictEqual(
        link.getElement().props.href,
        'https://github.com/orgs/tp-organization/teams/developers',
      );
      assert.strictEqual(
        link.getElement().props.target,
        '_blank',
      );
    });
  });
});

