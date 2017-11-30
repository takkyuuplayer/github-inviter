import React from 'react';
import { connect } from 'react-redux';

import { selectOrganization, setTeams, selectTeam } from 'actions/index';

import OrganizationSelector from 'components/OrganizationSelector';

const mapStateToProps = state => ({
  orgs: state.organizations,
  organizationId: state.organizationId,
});

const mapDispatchToProps = dispatch => ({
  handleSelectOrganization: (org) => {
    dispatch(selectOrganization(org.id));
    dispatch(setTeams(org.teams));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSelector);
