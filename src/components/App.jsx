import React from 'react';
import { Route } from 'react-router-dom';
import Auth from 'components/Auth';
import Admin from 'containers/Admin';
import Invitation from 'components/Invitation';

const App = () => (
  <div>
    <Route exact path="/" component={Auth} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/invitation" component={Invitation} />
  </div>
);

export default App;
