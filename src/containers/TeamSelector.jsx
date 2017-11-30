import { connect } from 'react-redux';

import { selectTeam } from 'ducks/teamId';
import TeamSelector from 'components/TeamSelector';

const mapStateToProps = state => ({
  teams: state.teams,
  teamId: state.teamId,
});

const mapDispatchToProps = dispatch => ({
  handleSelectTeam: (team) => {
    dispatch(selectTeam(team.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelector);
