module.exports = {
    module: {
        loaders: [
            {test: /\.html$/,  loader: 'string-loader'}
        ]
    },
    devtool: 'source-map'
};