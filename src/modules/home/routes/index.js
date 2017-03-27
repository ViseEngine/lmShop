import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import home from './home';
import store from './store';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={home} showBottomBar={true} showTitle={false}/>
  <Route path='/store/:storeId' component={store} showTitle={false}/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
