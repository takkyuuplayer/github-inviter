import assert from 'power-assert';
import React from 'react';
import { shallow } from 'enzyme';

import Error from './Error';

const props = {
  msg: "error message"
};

describe('components/Error', () => {
  const wrapper = shallow(<Error {...props} />);

  it('should return div', () => {
    assert.strictEqual(wrapper.find('div.alert.alert-danger').length, 1);
    assert.strictEqual(wrapper.contains('error message'), true);
  });
});

