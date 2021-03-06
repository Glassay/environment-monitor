import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import LoginLayout from './layouts/LoginLayout';
import BasicLayout from './layouts/BasicLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginLayout} />
        <Route path="/main" component={BasicLayout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
