var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var fs = require('fs');

var __appPath = path.join(__dirname, "./");

var isProduction = (function () {
    var env = process.env.NODE_ENV || "";
    var isRelease = env.trim() === "production";
    return isRelease;
})();


function getClientName() {
    var cmdLineArgs = process.argv;
    for (var i = 0; i < cmdLineArgs.length; i++) {
        var obj = cmdLineArgs[i];
        if (obj && obj.indexOf('client_name_') === 0) {
            return obj.replace(/^client_name_/, '');
        }
    }
    throw new Error('client_name is not found');
}


var clientName = getClientName();
console.log("clientName:", clientName);


var extractCSS = new ExtractTextPlugin('app/[name].[hash:8].css');
var extractLESS = new ExtractTextPlugin('app/[name].[hash:8].css');


module.exports = {
    target: 'web',
    cache: true,
    entry: {
        [clientName]: path.resolve(__appPath, `src/${clientName}/index.js`)
    },

    output: {
        path: path.resolve(__appPath, `../static/assets/${clientName}`),
        publicPath: isProduction ? `/static/assets/${clientName}/` : '/',
        filename: 'app/[name].[hash:8].js',
        chunkFilename: 'app/module.[name].[hash:8].js'
    },

    module: {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.shtml$/,
                loader: 'string2-loader'
            },
            {
                test: /\.css$/,
                use: extractCSS.extract(['css-loader', 'postcss-loader'])
            },
            {
                test: /\.less$/,
                use: extractLESS.extract(['css-loader', 'less-loader'])
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'url-loader?limit=1000&name=images/[name].[hash:8].[ext]'  // 1K以下内联
            }
        ]
    },


    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__appPath, `src/${clientName}/index.html`)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': !isProduction,
            'process.env.NODE_ENV': isProduction ? '"production"' : '"development"'
        }),

        extractCSS,
        extractLESS

    ],


    devtool: isProduction ? false : 'eval-cheap-source-map',

    devServer: {
        port: 2702,
        host: "0.0.0.0",
        disableHostCheck: true,
        contentBase: '../',
        historyApiFallback: true,
        proxy: {
            '/api/v1': {
                target: 'http://127.0.0.1:2701',  //线上环境
                secure: false,
                changeOrigin: true
            },
            '/page/v1': {
                target: 'http://127.0.0.1:2701',  //线上环境
                secure: false,
                changeOrigin: true
            }
        }
    }
};