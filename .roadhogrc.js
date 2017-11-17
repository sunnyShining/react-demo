module.exports = {
    "entry": "src/index.js",
    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr", // 热替换
                "transform-runtime",
                ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
            ],
            "sass": false,
            "hash": true,
            "publicPath": "/", // 注入html文件路径，开发环境，请勿修改
        },
        "production": {
            "extraBabelPlugins": [
                "transform-runtime",
                ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
            ],
            "publicPath": "/",
            "sass": false,
            "hash": true,
            "folderName": "TEST",
            "outputPath": "./dist/prd/TEST"
        },
        "staging": { // 环境
            "extraBabelPlugins": [
                "transform-runtime",
                ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }] // 引入ant的样式
            ],
            "publicPath": "/", // 注入html链接地址，根据需要使用
            "sass": false, // 暂不使用sass，如需使用此处为配置node-sass相关参数
            "hash": true, // 使用hash
            "folderName": "BROP-NEWIIA.html", // 根据打包最后zip包文件名
            "outputPath": "./dist/stg/TEST" // 打包路径
        }
    }
}