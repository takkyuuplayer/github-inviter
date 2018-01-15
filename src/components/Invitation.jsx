import React from 'react';

class Invitation extends React.Component {
  static joinInvitedTeam() {
    fetch('/api/join', {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json());
  }
  constructor() {
    super();

    this.getInvitedTeam = this.getInvitedTeam.bind(this);
  }
  state = {
    team: undefined,
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
      .then(json => this.setState({ team: json.data }));
  }
  render() {
    const { team } = this.state;

    if (team) {
      const url = `https://github.com/orgs/${team.org}/teams/${team.slug}`;
      const link = <a target="_blank" href={url}>{team.org}/{team.slug}</a>;
      return (
        <div className="jumbotron">
          <h1>Github Inviter</h1>
          <hr />
          <p>Do you want to join {link}?</p>
          <p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={(e) => {
              e.preventDefault();
              Invitation.joinInvitedTeam();
            }}
            >Join
            </button>
          </p>
        </div>
      );
    }
    return (
      <div className="jumbotron">
        <h1>Github Inviter</h1>
        <hr />
        Checking invitation...
      </div>
    );
  }
}

export default Invitation;
