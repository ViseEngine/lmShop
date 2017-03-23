import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import order from './order';
import coupon from './coupon';
import invoice from './invoice';
import address from './address';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={order} showBottomBar={false} title='确认订单' showTitle={true} />
  <Route path='/address' component={address} title='发票信息'/>
  <Route path='/coupon' component={coupon} title='店铺优惠券' />
  <Route path='/invoice' component={invoice} title='发票信息' />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
