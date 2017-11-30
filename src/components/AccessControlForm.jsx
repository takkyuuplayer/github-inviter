import React from 'react';
import PropTypes from 'prop-types';

const AccessControlForm = ({
  handleChangeExpiresAt,
  handleChangeIpAddresses,
  handleChangeEmailDomains,
}) => (
  <div>
    <div className="form-group row">
      <label className="col-sm-2" htmlFor="expires_at">Expires At</label>
      <div className="col-sm-10">
        <input
          type="text"
          className="form-control col-sm-10"
          name="expires_at"
          id="expires_at"
          onChange={e => handleChangeExpiresAt(e.target.value)}
          placeholder="e.g.) 2017-06-01 23:59:59"
        />
        <small className="form-text text-muted">When the invitation link expires.</small>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-2" htmlFor="ip_addresses">IP addresses</label>
      <div className="col-sm-10">
        <textarea
          className="form-control"
          name="ip_addresses"
          id="ip_addresses"
          rows="3"
          onChange={e => handleChangeIpAddresses(e.target.value)}
          placeholder="e.g.) 192.168.11.1"
        />
        <p className="form-text text-muted">
          IP address list allowed to join the team separated by line break.
        </p>
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-2" htmlFor="email_domains">Email domains</label>
      <div className="col-sm-10">
        <textarea
          className="form-control"
          name="email_domains"
          id="email_domains"
          rows="3"
          onChange={e => handleChangeEmailDomains(e.target.value)}
          placeholder="e.g.) @gmail.com"
        />
        <p className="form-text text-muted">
          <strong>Primary</strong> email domain list allowed to join the team separated by line break.
        </p>
      </div>
    </div>
  </div>
);

AccessControlForm.propTypes = {
  handleChangeExpiresAt: PropTypes.func.isRequired,
  handleChangeIpAddresses: PropTypes.func.isRequired,
  handleChangeEmailDomains: PropTypes.func.isRequired,
};

export default AccessControlForm;
