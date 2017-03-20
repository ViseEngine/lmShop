import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import goodsDetail from './goodsDetail';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={goodsDetail} showBottomBar={true} title='商品详情' showTitle={true}/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
