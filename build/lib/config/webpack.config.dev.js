'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (config, cwd) {
    var publicPath = '/';
    var _config$library = config.library,
        library = _config$library === undefined ? null : _config$library,
        _config$libraryTarget = config.libraryTarget,
        libraryTarget = _config$libraryTarget === undefined ? 'var' : _config$libraryTarget,
        _config$devtool = config.devtool,
        devtool = _config$devtool === undefined ? _common.defaultDevtool : _config$devtool;
    var babelOptions = (0, _common.getBabelOptions)(config);
    var cssLoaders = (0, _getCSSLoaders2.default)(config);
    var theme = (0, _getTheme2.default)(process.cwd(), config);
    var paths = (0, _paths2.default)(cwd);
    var output = {
        path: paths.appBuild,
        filename: '[name].js',
        publicPath: publicPath,
        libraryTarget: libraryTarget,
        chunkFilename: '[name].async.js'
    };
    if (library) output.library = library;

    var dllPlugins = config.dllPlugin ? [
        new _webpack2.default.DllReferencePlugin({
            context: paths.appSrc,
            manifest: require(paths.dllManifest) // eslint-disable-line
        }),
        new _copyWebpackPlugin2.default(
            [{
                from: (0, _path.join)(paths.dllNodeModule, 'roadhog.dll.js'),
                to: (0, _path.join)(paths.appBuild, 'roadhog.dll.js')
            }]
        )
    ] : [];

    var finalWebpackConfig = _extends(
        {
            devtool: devtool,
            entry: (0, _getEntry2.default)(config, paths.appDirectory),
            output: output
        },
        (0, _common.getResolve)(config, paths),
        {
            module: {
                rules: [].concat(
                    _toConsumableArray((0, _common.getFirstRules)(
                        {
                            paths: paths,
                            babelOptions: babelOptions
                        }
                    )),
                    _toConsumableArray((0, _common.getCSSRules)('development',
                        {
                            config: config,
                            paths: paths,
                            cssLoaders: cssLoaders,
                            theme: theme
                        }
                    )),
                     _toConsumableArray((0, _common.getLastRules)(
                        {
                            paths: paths,
                            babelOptions: babelOptions
                        }
                    )))
            },
            plugins: [
                new _webpack2.default.HotModuleReplacementPlugin(),
                new _caseSensitivePathsWebpackPlugin2.default(),
                new _WatchMissingNodeModulesPlugin2.default(paths.appNodeModules),
                new _systemBellWebpackPlugin2.default(),
            ].concat(dllPlugins, _toConsumableArray((0, _common.getCommonPlugins)(
                {
                    config: config,
                    paths: paths,
                    appBuild: paths.appBuild,
                    NODE_ENV: process.env.NODE_ENV
                }
            ))),
            externals: config.externals,
            node: _common.node
        }
    );

    if (config.svgSpriteLoaderDirs) {
        _common.baseSvgLoader.exclude = config.svgSpriteLoaderDirs;
        _common.spriteSvgLoader.include = config.svgSpriteLoaderDirs;
        finalWebpackConfig.module.rules.push(_common.baseSvgLoader);
        finalWebpackConfig.module.rules.push(_common.spriteSvgLoader);
    } else {
        finalWebpackConfig.module.rules.push(_common.baseSvgLoader);
    }
    return (0, _addExtraBabelIncludes2.default)(finalWebpackConfig, paths, config.extraBabelIncludes, babelOptions);
};
var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);
var _copyWebpackPlugin = require('copy-webpack-plugin');
var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);
var _webpack = require('webpack');
var _webpack2 = _interopRequireDefault(_webpack);
var _WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var _WatchMissingNodeModulesPlugin2 = _interopRequireDefault(_WatchMissingNodeModulesPlugin);
var _systemBellWebpackPlugin = require('system-bell-webpack-plugin');
var _systemBellWebpackPlugin2 = _interopRequireDefault(_systemBellWebpackPlugin);
var _path = require('path');
var _paths = require('./paths');
var _paths2 = _interopRequireDefault(_paths);
var _getEntry = require('../utils/getEntry');
var _getEntry2 = _interopRequireDefault(_getEntry);
var _getTheme = require('../utils/getTheme');
var _getTheme2 = _interopRequireDefault(_getTheme);
var _getCSSLoaders = require('../utils/getCSSLoaders');
var _getCSSLoaders2 = _interopRequireDefault(_getCSSLoaders);
var _addExtraBabelIncludes = require('../utils/addExtraBabelIncludes');
var _addExtraBabelIncludes2 = _interopRequireDefault(_addExtraBabelIncludes);
var _common = require('./common');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
module.exports = exports['default'];