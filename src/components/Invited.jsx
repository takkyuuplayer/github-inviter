import React from 'react';
import PropTypes from 'prop-types';
import { team as teamPropType } from 'constants/propTypes';

const Invited = ({ team, state }) => {
  const url = `https://github.com/orgs/${team.org}/teams/${team.slug}`;
  const link = <a target="_blank" href={url}>{team.org}/{team.slug}</a>;

  if (state === 'active') {
    return (<p>You are now a member of {link}</p>);
  }
  if (state === 'pending') {
    return (<p>You are invited to {link}. Please check your email.</p>);
  }
  return `Unknow status: ${state}`;
};

Invited.propTypes = {
  team: teamPropType.isRequired,
  state: PropTypes.string.isRequired,
};

export default Invited;
