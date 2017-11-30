import React from 'react';
import { Route } from 'react-router-dom';
import Auth from 'components/Auth';
import Admin from 'containers/Admin';

const App = () => (
  <div>
    <Route exact path="/" component={Auth} />
    <Route exact path="/admin" component={Admin} />
  </div>
);

export default App;
