import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import circle from './circle';
import circleDetail from './circleDetail';
import circleCreate from './circleCreate';


const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={circle} title='圈子' />
  <Route path='/circleDetail/(:circleId)' component={circleDetail} title='圈子详情'/>
  <Route path='/circleCreate' component={circleCreate} title='圈子创建'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
