import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import content from './content';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={content} title='资讯'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
