const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve('build'),
    libraryTarget: "window",
  },
};
