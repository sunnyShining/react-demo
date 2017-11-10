module.exports = {
    "entry": "src/index.js",
    "env": {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr",
                "transform-runtime"
            ],
            "publicPath": "/"
        },
        "production": {
            "extraBabelPlugins": [
                "transform-runtime"
            ],
            "publicPath": "/",
            "folderName": "BROP-NEWIIA.html",
            "outputPath": "./dist/prd/BROP-NEWIIA"
        },
        "staging": { // 环境
            "extraBabelPlugins": [
                "transform-runtime"
            ],
            "publicPath": "/", // 注入html链接地址，根据需要使用
            "folderName": "BROP-NEWIIA.html", // 根据打包最后zip包文件名
            "outputPath": "./dist/stg/BROP-NEWIIA" // 打包路径
        }
    }
}