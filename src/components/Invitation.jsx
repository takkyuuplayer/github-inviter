import React from 'react';

const ConfirmInvitation = ({ team, handleClickJoinButton }) => {
  const url = `https://github.com/orgs/${team.org}/teams/${team.slug}`;
  const link = <a target="_blank" href={url}>{team.org}/{team.slug}</a>;
  return (
    <div>
      <p>Do you want to join {link}?</p>
      <p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleClickJoinButton}
        >Join
        </button>
      </p>
    </div>
  );
};

const Invited = ({ team, invitation }) => {
  const url = `https://github.com/orgs/${team.org}/teams/${team.slug}`;
  const link = <a target="_blank" href={url}>{team.org}/{team.slug}</a>;

  if (invitation.state === 'active') {
    return (<p>You are now a member of {link}</p>);
  }
  if (invitation.state === 'pending') {
    return (<p>You are invited to {link}. Please check your email.</p>);
  }
  return `Unknow status: ${invitation.state}`;
};

class Invitation extends React.Component {
  constructor() {
    super();

    this.getInvitedTeam = this.getInvitedTeam.bind(this);
    this.joinInvitedTeam = this.joinInvitedTeam.bind(this);
  }
  state = {
    team: undefined,
    invitation: undefined,
  }
  componentDidMount() {
    this.getInvitedTeam();
  }
  getInvitedTeam() {
    this.setState({ team: undefined });

    fetch('/api/invitation', {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json())
      .then(json => this.setState(Object.assign({}, this.state, { team: json.data })));
  }
  joinInvitedTeam() {
    fetch('/api/join', {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json())
      .then(json => this.setState(Object.assign({}, this.state, { invitation: json.data })));
  }
  render() {
    const { invitation, team } = this.state;

    let comp = null;
    if (invitation) {
      comp = <Invited team={team} invitation={invitation} />;
    } else if (team) {
      comp = (<ConfirmInvitation
        team={team}
        handleClickJoinButton={(e) => {
              e.preventDefault();
              this.joinInvitedTeam();
            }}
      />);
    } else {
      comp = <p>Checking invitation...</p>;
    }

    return (
      <div className="jumbotron">
        <h1>Github Inviter</h1>
        <hr />
        {comp}
      </div>
    );
  }
}

export default Invitation;
