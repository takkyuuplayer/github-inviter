import Github from 'webService/github';
import flatten from 'lodash/flatten';

const ws = new Github();

ws.sendRequest({
  method: 'GET',
  uri: ws.apiEndPoints.user_organizations_url,
})
  .then(response => JSON.parse(response))
  .then(organizations => Promise.all(organizations.map(async (organization) => {
    const teams = await ws.sendRequest({
      method: 'GET',
      uri: `${organization.url}/teams`,
    }).then(response => JSON.parse(response));

    return teams.map(team => ({
      org: organization.login,
      id: team.id,
      name: team.name,
      slug: team.slug,
    }));
  }))).then(teams => console.log(JSON.stringify(flatten(teams))));
