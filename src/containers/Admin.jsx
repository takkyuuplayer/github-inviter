import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setTeams } from 'ducks/teams';

import TeamSelector from 'containers/TeamSelector';
import AccessControlForm from 'containers/AccessControlForm';
import GenerateLink from 'containers/GenerateLink';

class Admin extends React.Component {
  static propTypes = {
    setTeams: PropTypes.func.isRequired,
  }
  componentDidMount() {
    fetch('/api/teams', {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json())
      .then(json => this.props.setTeams(json.data));
  }
  render() {
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            Team <span className="badge badge-primary">Required</span>
          </label>
          <div className="col-sm-10 form-inline">
            <TeamSelector />
          </div>
        </div>
        <AccessControlForm />
        <GenerateLink />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTeams: (teams) => {
    dispatch(setTeams(teams));
  },
});

export default connect(null, mapDispatchToProps)(Admin);
