var webpack = require('webpack')
var config = require('../webpack.dev.config')

webpack(config, function() {
  console.log('webpack打包完成');
})
