'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.node = exports.defaultDevtool = exports.spriteSvgLoader = exports.baseSvgLoader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getBabelOptions = getBabelOptions;
exports.getResolve = getResolve;
exports.getFirstRules = getFirstRules;
exports.getLastRules = getLastRules;
exports.getCSSRules = getCSSRules;
exports.getCommonPlugins = getCommonPlugins;
var _webpack = require('webpack');
var _webpack2 = _interopRequireDefault(_webpack);
var _autoprefixer = require('autoprefixer');
var _autoprefixer2 = _interopRequireDefault(_autoprefixer);
var _fs = require('fs');
var _path = require('path');
var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);
var _copyWebpackPlugin = require('copy-webpack-plugin');
var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);
var _htmlWebpackPlugin = require('html-webpack-plugin');
var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);
var _normalizeDefine = require('../utils/normalizeDefine');
var _normalizeDefine2 = _interopRequireDefault(_normalizeDefine);
var _winPath = require('../utils/winPath');
var _winPath2 = _interopRequireDefault(_winPath);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

function getBabelOptions(config) {
    return {
        babelrc: false,
        presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')].concat(config.extraBabelPresets || []),
        plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-react-require'), require.resolve('babel-plugin-syntax-dynamic-import')].concat(config.extraBabelPlugins || []),
        cacheDirectory: true
    };
}

var baseSvgLoader = exports.baseSvgLoader = {
    test: /\.svg$/,
    loader: 'file',
    options: {
        name: 'static/image/[name].[hash:8].[ext]'
    }
};

var spriteSvgLoader = exports.spriteSvgLoader = {
    test: /\.(svg)$/i,
    loader: 'svg-sprite'
};

var defaultDevtool = exports.defaultDevtool = '#cheap-module-eval-source-map';

function getResolve(config, paths) {
    return {
        resolve: {
            modules: [paths.ownNodeModules, paths.appNodeModules, 'node_modules'],
            extensions: [].concat(_toConsumableArray(config.extraResolveExtensions || []), ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.json', '.jsx', '.ts', '.tsx'])
        },
        resolveLoader: {
            modules: [paths.ownNodeModules, paths.appNodeModules],
            moduleExtensions: ['-loader']
        }
    };
}

function getFirstRules(_ref) {
    var paths = _ref.paths,
        babelOptions = _ref.babelOptions,
        eslintOptions = _ref.eslintOptions;

    return [
        {
            exclude: [/\.(html|ejs)$/, /\.(js|jsx)$/, /\.(css|less|scss)$/, /\.json$/, /\.svg$/, /\.tsx?$/],
            loader: 'url',
            options: {
                limit: 10000,
                name: 'static/[name].[hash:8].[ext]'
            }
        },  {
            test: /\.(js|jsx)$/,
            loader: 'eslint',
            enforce: 'pre',
            include: paths.appSrc,
            options: {
              formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: 'babel',
            options: babelOptions
        }
    ];
}

function getLastRules(_ref2) {
    var paths = _ref2.paths,
        babelOptions = _ref2.babelOptions;

    return [
        {
            test: /\.html$/,
            loader: 'file',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.tsx?$/,
            include: paths.appSrc,
            use: [{
                loader: 'babel',
                options: babelOptions
            }, {
                loader: 'awesome-typescript',
                options: {
                    transpileOnly: true
                }
            }]
        }
    ];
}

function getCSSRules(env, _ref3) {
    var config = _ref3.config,
        paths = _ref3.paths,
        cssLoaders = _ref3.cssLoaders,
        theme = _ref3.theme;

    function isExclude(modulePath) {
        if (config.cssModulesExclude && config.cssModulesExclude.length) {
            return config.cssModulesExclude.some(function (item) {
                return (0, _winPath2.default)((0, _path.join)(paths.appDirectory, item)).indexOf((0, _winPath2.default)(modulePath)) > -1;
            });
        }
        return false;
    }

    function includeTest(root, modulePath) {
        return modulePath.indexOf(root) > -1 && !isExclude(modulePath);
    }

    var rules = [
        {
            test: /\.css$/,
            include: includeTest.bind(null, paths.appSrc),
            use: ['style'].concat(_toConsumableArray(cssLoaders.own))
        }, {
            test: /\.less$/,
            include: includeTest.bind(null, paths.appSrc),
            use: ['style'].concat(_toConsumableArray(cssLoaders.own),
                [{
                    loader: 'less',
                    options: {
                        modifyVars: theme
                    }
                }]
            )
        }, {
            test: /\.css$/,
            include: includeTest.bind(null, paths.appNodeModules),
            use: ['style'].concat(_toConsumableArray(cssLoaders.nodeModules))
        }, {
            test: /\.less$/,
            include: includeTest.bind(null, paths.appNodeModules),
            use: ['style'].concat(_toConsumableArray(cssLoaders.nodeModules),
                [{
                    loader: 'less',
                    options: {
                        modifyVars: theme
                    }
                }]
            )
        }
    ];
    if (config.cssModulesExclude && config.cssModulesExclude.length) {
        var include = config.cssModulesExclude.map(function (item) {
            return (0, _path.join)(paths.appDirectory, item);
        });
        rules = [].concat(_toConsumableArray(rules), [
            {
                test: /\.css$/,
                include: include,
                use: ['style'].concat(_toConsumableArray(cssLoaders.noCSSModules))
            }, {
                test: /\.less$/,
                include: include,
                use: ['style'].concat(_toConsumableArray(cssLoaders.noCSSModules),
                    [{
                        loader: 'less',
                        options: {
                            modifyVars: theme
                        }
                    }]
                )
            }
        ]);
    }
    if (config.sass) {
        var sassOptions = config.sass === true ? {} : config.sass;
            rules = [].concat(_toConsumableArray(rules), [
                {
                    test: /\.scss$/,
                    include: includeTest.bind(null, paths.appSrc),
                    use: ['style'].concat(_toConsumableArray(cssLoaders.own),
                        [{
                            loader: 'sass',
                            options: sassOptions
                        }]
                    )
                }, {
                    test: /\.scss$/,
                    include: includeTest.bind(null, paths.appNodeModules),
                    use: ['style'].concat(_toConsumableArray(cssLoaders.nodeModules),
                        [{
                            loader: 'sass',
                            options: sassOptions
                        }]
                    )
                }
            ]);
        if (config.cssModulesExclude && config.cssModulesExclude.length) {
            var _include = config.cssModulesExclude.map(function (item) {
                return (0, _path.join)(paths.appDirectory, item);
            });
            rules = [].concat(_toConsumableArray(rules),
                [{
                    test: /\.scss$/,
                    include: _include,
                    use: ['style'].concat(_toConsumableArray(cssLoaders.noCSSModules),
                        [{
                            loader: 'sass',
                            options: sassOptions
                        }]
                    )
                }]
            );
        }
    }
    if (env === 'production') {
        rules.forEach(function (rule) {
            rule.use = _extractTextWebpackPlugin2.default.extract({
                // fallback: 'style',
                use: rule.use.slice(1)
            });
        });
    }
    return rules;
}

var node = exports.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
};

function getCommonPlugins(_ref4) {
    var config = _ref4.config,
    paths = _ref4.paths,
    appBuild = _ref4.appBuild,
    NODE_ENV = _ref4.NODE_ENV;
    var ret = [];
    // 定义常量
    var defineObj = {
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    };
    if (config.define) {
        defineObj = _extends({}, defineObj, (0, _normalizeDefine2.default)(config.define));
    }
    ret.push(new _webpack2.default.DefinePlugin(defineObj));
    if ((0, _fs.existsSync)((0, _path.join)(paths.appSrc, 'index.ejs'))) {
        ret.push(new _htmlWebpackPlugin2.default({
            template: 'src/index.ejs',
            inject: true
        }));
    }
    if ((0, _fs.existsSync)(paths.appPublic)) {
        ret.push(
            new _copyWebpackPlugin2.default([
                {
                    from: paths.appPublic,
                    to: appBuild
                }
            ])
        );
    }
    if (config.multipage) {
        // Support hash
        var name = config.hash ? 'common.[hash]' : 'common';
        ret.push(new _webpack2.default.optimize.CommonsChunkPlugin(
            {
                name: 'common',
                filename: name + '.js'
            }
        ));
    }
    if (config.ignoreMomentLocale) {
        ret.push(new _webpack2.default.IgnorePlugin(/^\.\/locale$/, /moment$/));
    }
    ret.push(new _webpack2.default.LoaderOptionsPlugin({
        options: {
            context: __dirname,
            postcss: [(0, _autoprefixer2.default)(
                config.autoprefixer || {
                    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
                }
            )].concat(_toConsumableArray(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []))
        }
    }));
    return ret;
}