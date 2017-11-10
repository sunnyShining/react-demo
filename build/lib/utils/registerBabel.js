'use strict';

var _path = require('path');

var _winPath = require('./winPath');

var _winPath2 = _interopRequireDefault(_winPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();
var files = ['webpack.config.js', '.roadhogrc.js', '.roadhogrc.mock.js', (0, _winPath2.default)((0, _path.join)(cwd, 'mock')), (0, _winPath2.default)((0, _path.join)(cwd, 'src'))];

if (process.env.NODE_ENV !== 'test') {
  require('babel-register')({
    only: new RegExp('(' + files.join('|') + ')'),
    presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
    plugins: [require.resolve('babel-plugin-add-module-exports')],
    babelrc: false
  });
}