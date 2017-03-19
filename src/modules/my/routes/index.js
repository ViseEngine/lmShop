import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import my from './my';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={my} showBottomBar={true} title='我的' showTitle={true}/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
