'use strict';

const zipWebpackPlugin = require('./ZipWebpackPlugin');
const path = require('path');
const moment = require('moment');
const nowEnv = process.env.NODE_ENV === 'production' ? 'prd' : 'stg';
const build_time = moment().format('YYYYMMDDHHmmSS');
const CleanPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function(args, appBuild, config, paths) {
    var watch = args.watch,
        debug = args.debug,
        analyze = args.analyze;
    var NODE_ENV = debug ? 'development' : process.env.NODE_ENV;
    var _config$publicPath = config.publicPath,
        publicPath = _config$publicPath === undefined ? '/' : _config$publicPath,
        _config$library = config.library,
        library = _config$library === undefined ? null : _config$library,
        _config$libraryTarget = config.libraryTarget,
        libraryTarget = _config$libraryTarget === undefined ? 'var' : _config$libraryTarget,
        _config$devtool = config.devtool,
        _config$folderName = config.folderName,
        devtool = _config$devtool === undefined ? debug ? _common.defaultDevtool : false : _config$devtool;

    const folderName = _config$folderName;
    var babelOptions = (0, _common.getBabelOptions)(config);
    var cssLoaders = (0, _getCSSLoaders2.default)(config);
    var theme = (0, _getTheme2.default)(process.cwd(), config);

    // Support hash
    var jsFileName = config.hash ? 'static/js/[name].[chunkhash:8]' : 'static/js/[name]';
    var cssFileName = config.hash ? 'static/css/[name].[contenthash:8]' : 'static/css/[name]';
    var output = {
        path: appBuild,
        filename: jsFileName + '.js',
        publicPath: publicPath,
        libraryTarget: libraryTarget,
        chunkFilename: jsFileName + '.async.js'
    };

    if (library) output.library = library;

    var finalWebpackConfig = _extends(
        {
            bail: true,
            devtool: devtool,
            entry: (0, _getEntry2.default)(config, paths.appDirectory, /* isBuild */ true),
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
                    _toConsumableArray((0, _common.getCSSRules)('production',
                        {
                            config: config,
                            paths: paths,
                            cssLoaders: cssLoaders,
                            theme: theme
                        }
                    )), _toConsumableArray((0, _common.getLastRules)(
                        {
                            paths: paths,
                            babelOptions: babelOptions
                        }
                    ))
                )
            },
            plugins: [].concat(_toConsumableArray(watch ? [] :[
                    new _webpack2.default.optimize.OccurrenceOrderPlugin(),
                    new _webpack2.default.optimize.DedupePlugin()
                ]), [
                    new CleanPlugin([nowEnv], {
                        root: resolveApp('./dist/')
                    }),
                ], [
                    new _extractTextWebpackPlugin2.default({
                        filename: cssFileName + '.css',
                        allChunks: true
                    })
                ], _toConsumableArray((0, _common.getCommonPlugins)({
                    config: config,
                    paths: paths,
                    appBuild: appBuild,
                    NODE_ENV: NODE_ENV
                })), [
                    new zipWebpackPlugin({
                        outpath: resolveApp(`./dist/${nowEnv}`),
                        pathPrefix: `./`,
                        filename: `${folderName}_${build_time}`
                    }),
                ], _toConsumableArray(debug ? [] : [
                    new _webpack2.default.optimize.UglifyJsPlugin({
                        compress: {
                            screw_ie8: true, // React doesn't support IE8
                            warnings: false
                        },
                        mangle: {
                            screw_ie8: true
                        },
                        output: {
                            comments: false,
                            screw_ie8: true,
                            ascii_only: true
                        }
                    })
                ]), _toConsumableArray(analyze ? [
                    new _webpackVisualizerPlugin2.default()
                ] : [])
            ),
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

var _webpack = require('webpack');
var _webpack2 = _interopRequireDefault(_webpack);
var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);
var _webpackVisualizerPlugin = require('webpack-visualizer-plugin');
var _webpackVisualizerPlugin2 = _interopRequireDefault(_webpackVisualizerPlugin);
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
