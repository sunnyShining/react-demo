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
        "staging": {
            "extraBabelPlugins": [
                "transform-runtime"
            ],
            "publicPath": "/",
            "folderName": "BROP-NEWIIA.html",
            "outputPath": "./dist/stg/BROP-NEWIIA"
        }
    }
}