import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import circle from './circle';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={circle} title='圈子'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
