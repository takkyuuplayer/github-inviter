import assert from 'power-assert';
import React from 'react';
import { shallow } from 'enzyme';

import Auth from './Auth';

describe('components/Auth', () => {
  const wrapper = shallow(<Auth />);
  it('should be rendered', () => {
    assert(wrapper.length);
  });
});
