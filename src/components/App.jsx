import React from 'react';
import { Route } from 'react-router-dom';
import Auth from 'components/Auth';

const App = () => (
  <div>
    <Route exact path="/" component={Auth} />
  </div>
);

export default App;
