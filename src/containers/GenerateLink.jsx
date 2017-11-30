import React from 'react';
import { connect } from 'react-redux';

import urijs from 'urijs';

class GenerateLink extends React.Component {
  constructor() {
    super();

    this.generateInvitationLink = this.generateInvitationLink.bind(this);
  }
  state = {
    url: undefined,
  }
  generateInvitationLink() {
    this.setState({ url: undefined });

    const query = {};

    ['teamId', 'expiresAt', 'ipAddresses', 'emailDomains'].forEach((key) => {
      if (this.props[key] && this.props[key] !== '') {
        query[key] = this.props[key];
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
        this.setState({
          url: urijs(window.location.origin).query({
            token: json.data,
          }).toString(),
        });
      });
  }
  render() {
    const link = this.state.url
      ? <a href={this.state.url} target="_blank">Share this link</a>
      : '';

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
        <div className="col-sm-7">{link}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(GenerateLink);
