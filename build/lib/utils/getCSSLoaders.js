'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getCSSLoaders;
function getCSSLoaders(config) {
  var own = [];
  var nodeModules = [];
  var noCSSModules = [];

  var baseCSSOptions = {
    importLoaders: 1,
    sourceMap: !config.disableCSSSourceMap
  };

  if (config.disableCSSModules) {
    own.push({
      loader: 'css',
      options: baseCSSOptions
    });
  } else {
    own.push({
      loader: 'css',
      options: _extends({}, baseCSSOptions, {
        modules: true,
        localIdentName: '[local]___[hash:base64:5]'
      })
    });
  }
  nodeModules.push({
    loader: 'css',
    options: baseCSSOptions
  });
  noCSSModules.push({
    loader: 'css',
    options: baseCSSOptions
  });

  var postcssLoader = {
    loader: 'postcss'
  };

  noCSSModules.push(postcssLoader);
  own.push(postcssLoader);
  nodeModules.push(postcssLoader);

  return {
    own: own,
    nodeModules: nodeModules,
    noCSSModules: noCSSModules
  };
}
module.exports = exports['default'];