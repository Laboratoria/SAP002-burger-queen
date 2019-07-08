import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}  render={}/>
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <PrivateRoute exact path='/' component={() => <h1>Hello World</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;