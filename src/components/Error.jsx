import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ msg }) => (
  <div className="alert alert-danger" role="alert">{msg}</div>
);

Error.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Error;
