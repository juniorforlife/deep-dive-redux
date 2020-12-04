const path = require('path');
const webpack = require('webpack')

module.exports = {
 mode: "none",
 entry: "./index.js",
 output: {
   path: __dirname + '/dist',
   filename: "index.bundle.js"
 },
 devServer: {
   contentBase: path.join(__dirname, 'dist')
 },
 module: {
   rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
          ]
        }
      }
    },
   ],
 },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}