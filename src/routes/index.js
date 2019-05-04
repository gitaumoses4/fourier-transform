import {Route, Switch} from 'react-router';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Home from '../views/Home';

const routes = {
  '/': Home
};

const App = () => (
  <BrowserRouter>
    <Switch>
      {
        Object.keys(routes).map(route => (
          <Route path={route} key={route} exact component={routes[route]} />
        ))
      }
    </Switch>
  </BrowserRouter>
);

export default App;
