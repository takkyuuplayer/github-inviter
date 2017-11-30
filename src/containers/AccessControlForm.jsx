import { connect } from 'react-redux';

import { setExpiresAt } from 'ducks/expiresAt';
import { setEmailDomains } from 'ducks/emailDomains';
import { setIpAddresses } from 'ducks/ipAddresses';
import AccessControlForm from 'components/AccessControlForm';

const mapDispatchToProps = dispatch => ({
  handleChangeExpiresAt: expiresAt => dispatch(setExpiresAt(expiresAt)),
  handleChangeIpAddresses: ipAddresses => dispatch(setIpAddresses(ipAddresses)),
  handleChangeEmailDomains: domains => dispatch(setEmailDomains(domains)),
});

export default connect(null, mapDispatchToProps)(AccessControlForm);
