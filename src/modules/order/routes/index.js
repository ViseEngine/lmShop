import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import order from './order';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={order} showBottomBar={false} title='确认订单' showTitle={true}/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
