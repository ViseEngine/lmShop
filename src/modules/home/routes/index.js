import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import home from './home';
import store from './store';
import storeDetail from './storeDetail';
import storeGoods from './storeGoods';
import storeNewGoods from './storeNewGoods';
import storeCoupon from './storeCoupon';

import goodsSearch from './goodsSearch';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={home} showBottomBar={true} showTitle={false}/>
  <Route path='store/:storeId/'>
    <Route path='index' component={store} showTitle={false}/>    
    <Route path='detail' component={storeDetail} title='店铺详情'/>
    <Route path='goods(/:goodsName)' component={storeGoods} title='店铺商品' />
    <Route path='newgoods' component={storeNewGoods} title='上新' />
    <Route path='coupon' component={storeCoupon} title='优惠券' />
  </Route>  
  
  <Route path='/search' component={goodsSearch} title='商品搜索' />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
