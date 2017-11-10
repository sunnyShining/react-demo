'use strict';

var _getConfig = require('../utils/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = (0, _getConfig2.default)('test', process.cwd());

require('babel-register')({
  presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')].concat(config.extraBabelPresets || []),
  plugins: [require.resolve('babel-plugin-add-module-exports')].concat(config.extraBabelPlugins || [])
});

var noop = function noop() {
  return null;
};
['.css', '.less', '.html', '.htm'].forEach(function (ext) {
  require.extensions[ext] = noop;
});