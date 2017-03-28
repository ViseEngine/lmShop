import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import home from './home';
import store from './store';
import storeDetail from './storeDetail';
import goodsSearch from './goodsSearch';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={home} showBottomBar={true} showTitle={false}/>
  <Route path='/store/:storeId' component={store} showTitle={false} />
  <Route path='/store/detail/:storeId' component={storeDetail} title='店铺详情' showTitle={true} />
  <Route path='/search' component={goodsSearch} showTitle={false} />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
