import React from 'react';
import PropTypes from 'prop-types';
import { team as teamPropType } from 'constants/propTypes';

const ConfirmInvitation = ({ team, handleJoin }) => {
  const url = `https://github.com/orgs/${team.org}/teams/${team.slug}`;
  const link = <a target="_blank" href={url}>{team.org}/{team.slug}</a>;

  return (
    <div>
      <p>Do you want to join {link}?</p>
      <p>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleJoin}
        >Join
        </button>
      </p>
    </div>
  );
};

ConfirmInvitation.propTypes = {
  team: teamPropType.isRequired,
  handleJoin: PropTypes.func.isRequired,
};
export default ConfirmInvitation;
