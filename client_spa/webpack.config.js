var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var extractCSS = new ExtractTextPlugin('app/[name].[chunkhash:8].css');
var extractLESS = new ExtractTextPlugin('app/[name].[chunkhash:8].css');

var __appPath = path.join(__dirname, "./");

var isProduction = (function () {
    var env = process.env.NODE_ENV || "";
    var isRelease = env.trim() === "production";
    console.log("process.env.NODE_ENV:" + process.env.NODE_ENV, "isRelease:", isRelease);
    return isRelease;
})();

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        'client_spa': path.resolve(__appPath, 'src/index.js')
    },

    output: {
        path: path.resolve(__appPath, '../static/assets_spa'),
        publicPath: "",
        filename: 'app/[name].[chunkhash:8].js',
        chunkFilename: 'app/module.[name].[chunkhash:8].js'
    },

    module: {

        rules: [
            {
                test: /\.html$/,
                loader: 'string-loader'
            },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.less$/,
                use: extractLESS.extract([ 'css-loader', 'less-loader' ])
            }
        ]
    },


    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__appPath,'index.html')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }

        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': !isProduction,
            'process.env.NODE_ENV': isProduction ? '"production"' : '"development"'
        }),

        extractCSS,
        extractLESS

    ],


    devtool: isProduction ? false : 'source-map',

    devServer: {
        port: 6782,
        host: "0.0.0.0",
        contentBase: './',
        historyApiFallback: true,
        proxy: {
            '/api/v1': {
                target: 'http://127.0.0.1:2701',  //线上环境
                secure: false,
                changeOrigin: true
            }
        }
    }
};