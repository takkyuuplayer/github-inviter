import React from 'react';
import { connect } from 'react-redux';

import urijs from 'urijs';
import copyToClipboard from 'copy-to-clipboard';

class GenerateLink extends React.Component {
  constructor() {
    super();

    this.generateInvitationLink = this.generateInvitationLink.bind(this);
  }
  generateInvitationLink() {
    const query = {};

    ['teamId', 'expiresAt', 'ipAddresses', 'emailDomains'].forEach((key) => {
      if (this.props[key] && this.props[key] !== '') {
        // to use JWT `exp` feature
        query[(key === 'expiresAt' ? 'exp' : key)] = this.props[key];
      }
    });

    fetch('/api/sign', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => response.json())
      .then((json) => {
        const url = urijs(window.location.origin).path('/auth/token').query({
          token: json.data,
        }).toString();
        copyToClipboard(url);
      });
  }
  render() {
    const disabled = !this.props.teamId;

    return (
      <div className="row">
        <div className="offset-sm-2">
          <button
            type="button"
            className="btn btn-primary form-control"
            onClick={(e) => {
              e.preventDefault();
              this.generateInvitationLink();
            }}
            disabled={disabled}
          >Generate Link
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(GenerateLink);
