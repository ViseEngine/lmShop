const path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: "./src/main",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/assets/"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, "./src/common"),
        path.resolve(__dirname, "./src/main")
      ],
      exclude: [],
      loader: "babel-loader",
      options: {
        presets: ["es2015"]
      }
    }]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "common": path.resolve(__dirname, "./src/common"),
    }
  },

  devtool: "source-map",
  context: __dirname,
  target: "web",
  stats: "errors-only",

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          }
        }
      }
    },
    contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
