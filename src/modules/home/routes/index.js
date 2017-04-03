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

import my from './my';
import orderList from './orderList';
import orderDetail from './orderDetail';

import afterSale from './afterSale';
import commentList from './commentList';
import comment from './comment';

import account from './account/account';
import accountSafe from './account/accountSafe';
import recharge from './account/recharge';

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
  <Route path='/search/(:keyword)' component={goodsSearch} title='商品搜索' />
  
  <Route path='/attention(/:type)' component={attention} title='我的关注' />
  <Route path='/viewRecord(/:type)' component={viewRecord} title='浏览记录' />
  <Route path='/returns' component={returns} title='退换货' />
  <Route path='/myIntegral' component={myIntegral} title='积分' />
  <Route path='/coupon(/:couponIsUser)' component={coupon} title='我的优惠券' />

  <Route path='/my' component={my} title='我的' showBottomBar={true} />
  <Route path='/orderList/(:type)' component={orderList} title='订单列表'/>
  <Route path='/orderDetail/(:id)' component={orderDetail} title='订单详情'/>

  <Route path='/afterSale' component={afterSale} title='售后列表' />
  <Route path='/commentList' component={commentList} title='评价晒单'/>
  <Route path='/comment' component={comment} title='评价晒单'/>
  
  <Route path='/account' component={account} title='账户管理' />
  <Route path='/accountSafe' component={accountSafe} title='账户安全'/>
  <Route path='/recharge' component={recharge} title='余额充值'/>

</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
