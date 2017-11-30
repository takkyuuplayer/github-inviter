import assert from 'power-assert';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AccessControlForm from './AccessControlForm';

describe('components/AccessControlForm', () => {
  const wrapper = shallow(
    <AccessControlForm
      handleChangeExpiresAt={sinon.spy()}
      handleChangeIpAddresses={sinon.spy()}
      handleChangeEmailDomains={sinon.spy()}
    />
  );

  it('contains 3 fields for access control', () => {
    assert.strictEqual(wrapper.find('textarea#ip_addresses').length, 1);
    assert.strictEqual(wrapper.find('textarea#email_domains').length, 1);
    assert.strictEqual(wrapper.find('input#expires_at').length, 1);
  });
});
