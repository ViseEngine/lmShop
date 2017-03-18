var webpack = require('webpack')
var config = require('../webpack.config')

webpack(config, function() {
  console.log('webpack打包完成');
})
