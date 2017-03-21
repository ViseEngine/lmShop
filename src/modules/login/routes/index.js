import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import login from './login';
import reg from './reg';
import forgetPassword from './forgetPassword';


const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={login} showBottomBar={false} title='登录' showTitle={true} />
  <Route component={reg} showBottomBar={false} title='手机快速注册' showTitle={true}/>
  <Route component={forgetPassword} showBottomBar={false} title='重新获取验证码' showTitle={true}/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
