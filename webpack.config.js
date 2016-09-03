var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool:  "inline-sourcemap",
    entry: {
        client: "./index.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    output: {
        path: __dirname + "/js",
        filename: "[name].min.js"
    },
    plugins: []
};
