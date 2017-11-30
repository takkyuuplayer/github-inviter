import React from 'react';
import PropTypes from 'prop-types';

import { team as teamPropType } from 'constants/propTypes';

const TeamSelector = ({
  teams,
  teamId,
  handleSelectTeam,
}) => {
  const options = teams.map((team, idx) => (
    <option
      key={team.id}
      value={idx}
    >
      {team.org}/{team.name}
    </option>
  ));

  if (!teamId) {
    options.unshift(<option key="team">-- team ---</option>);
  }

  return (
    <select
      className="form-control col-sm-4"
      onChange={e => handleSelectTeam(teams[e.target.value])}
    >
      {options}
    </select>
  );
};

TeamSelector.defaultProps = {
  teamId: null,
};

TeamSelector.propTypes = {
  teams: PropTypes.arrayOf(teamPropType).isRequired,
  teamId: PropTypes.number,
  handleSelectTeam: PropTypes.func.isRequired,
};

export default TeamSelector;
