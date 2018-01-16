import React from 'react';

import Invited from './Invited';
import ConfirmInvitation from './ConfirmInvitation';
import Error from './Error';

class Invitation extends React.Component {
  constructor() {
    super();

    this.getInvitedTeam = this.getInvitedTeam.bind(this);
    this.joinInvitedTeam = this.joinInvitedTeam.bind(this);
  }
  state = {
    team: undefined,
    invitation: undefined,
    error: undefined,
  }
  componentDidMount() {
    this.getInvitedTeam();
  }
  getInvitedTeam() {
    this.setState({ team: undefined });

    fetch('/api/invitation', {
      method: 'GET',
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();

      if (response.ok) {
        this.setState(Object.assign({}, this.state, { team: json.data }));
        return;
      }
      this.setState(Object.assign({}, this.state, { error: json.meta.message }));
    });
  }
  joinInvitedTeam() {
    this.setState(Object.assign({}, this.state, { error: undefined }));

    fetch('/api/join', {
      method: 'GET',
      credentials: 'include',
    }).then(async (response) => {
      const json = await response.json();

      if (response.ok) {
        this.setState(Object.assign({}, this.state, { invitation: json.data }));
        return;
      }
      this.setState(Object.assign({}, this.state, { error: json.meta.message }));
    });
  }
  render() {
    const { invitation, team } = this.state;

    let comp = null;
    if (invitation) {
      comp = <Invited team={team} state={invitation.state} />;
    } else if (team) {
      comp = (<ConfirmInvitation
        team={team}
        handleJoin={(e) => {
              e.preventDefault();
              this.joinInvitedTeam();
            }}
      />);
    } else {
      comp = <p>Checking invitation...</p>;
    }
    const error = this.state.error
      ? <Error msg={this.state.error} />
      : null;

    return (
      <div className="jumbotron">
        <h1>Github Inviter</h1>
        <hr />
        {comp}
        {error}
      </div>
    );
  }
}

export default Invitation;
