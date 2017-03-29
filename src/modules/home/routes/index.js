import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import home from './home';
import store from './store';
import storeDetail from './storeDetail';
import storeGoods from './storeGoods';
import storeNewGoods from './storeNewGoods';
import storeCoupon from './storeCoupon';

import gotoSearch from './gotoSearch';
import goodsSearch from './goodsSearch';

import attention from './attention';
import viewRecord from './viewRecord';
import returns from './returns';
import myIntegral from './myIntegral';
import coupon from './coupon';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={home} showBottomBar={true} showTitle={false}/>
  <Route path='store/:storeId/'>
    <Route path='index' component={store} showTitle={false}/>    
    <Route path='detail' component={storeDetail} title='店铺详情'/>
    <Route path='goods(/:goodsName)' component={storeGoods} title='店铺商品' />
    <Route path='newgoods' component={storeNewGoods} title='上新' />
    <Route path='coupon' component={storeCoupon} title='优惠券' />
  </Route>

  <Route path='/gotoSearch' component={gotoSearch} showTitle={false}/>
  <Route path='/search/(:goodsName)' component={goodsSearch} title='商品搜索' />
  
  <Route path='/attention(/:type)' component={attention} title='我的关注' />
  <Route path='/viewRecord(/:type)' component={viewRecord} title='浏览记录' />
  <Route path='/returns' component={returns} title='退换货' />
  <Route path='/myIntegral' component={myIntegral} title='积分' />
  <Route path='/coupon' component={coupon} title='优惠券' />


</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
