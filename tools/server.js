var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

var proxyInterface = ['/floor/api', '/goods/api/'];
var proxy = {};
proxyInterface.forEach(function(item) {
  proxy[item] = {
    target: 'http://testbbc.leimingtech.com',
    changeOrigin: true,
    logLevel: 'debug'
  };
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: proxy
}).listen(3000, '0.0.0.0', function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/')
});
