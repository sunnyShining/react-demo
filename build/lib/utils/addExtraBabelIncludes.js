'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (webpackConfig, paths) {
  var includes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var babelOptions = arguments[3];

  includes.forEach(function (include) {
    webpackConfig.module.rules.push({
      test: /\.(js|jsx)$/,
      include: (0, _path.join)(paths.appDirectory, include),
      loader: 'babel',
      options: babelOptions
    });
  });
  return webpackConfig;
};

var _path = require('path');

module.exports = exports['default'];