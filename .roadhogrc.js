module.exports = {
    "entry": "src/index.js",
    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr", // 热替换
                "transform-runtime"
            ],
            "publicPath": "/", // 注入html文件路径，开发环境，请勿修改
            "listenPort": "8000" // 端口号
        },
        "production": {
            "extraBabelPlugins": [
                "transform-runtime"
            ],
            "dllPlugin": "",
            "publicPath": "/",
            "folderName": "BROP-NEWIIA.html",
            "outputPath": "./dist/prd/BROP-NEWIIA"
        },
        "staging": { // 环境
            "extraBabelPlugins": [
                "transform-runtime"
            ],
            "dllPlugin": "",
            "publicPath": "/", // 注入html链接地址，根据需要使用
            "folderName": "BROP-NEWIIA.html", // 根据打包最后zip包文件名
            "outputPath": "./dist/stg/BROP-NEWIIA" // 打包路径
        }
    }
}