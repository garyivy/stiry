var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var CORE_JS_SHIM = path.resolve(__dirname, './../node_modules/core-js/shim.js');
var SOURCE_DIR = path.resolve(__dirname, './../source');
var BUILD_DIR = path.resolve(__dirname, './../build');

var config = {
    entry: [
        CORE_JS_SHIM, // Polyfill for things that IE may not provide such as Object.assign, Array.ForEach, etc.
        SOURCE_DIR + '/App.jsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    devServer: {
        historyApiFallback: true,
        publicPath: '/',
        contentBase: './build',
        compress: true,
        port: 9000,
        proxy: { '/api': 'http://localhost:3001' }
    },
    module: {
        rules: [
            /* TODO: Moving to typescript and will revisiting linting then.
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: path.join(__dirname, 'eslint.js'),
                    useEslintrc: false
                },
            },
            */
            {
                test: /\.(js|jsx)$/,
                include: SOURCE_DIR,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'], plugins: ["transform-object-rest-spread"] }
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.s?css$/,
                include: SOURCE_DIR,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        'sass-loader'
                    ]
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new HtmlWebpackPlugin({
            template: SOURCE_DIR + '/index.html',
            hash: true, // Adds a "cache buster" query string to the link href and javascript src properties
            minify: { removeComments: true }
        })
    ]
};

module.exports = function (isDevelopment) {
    if (!isDevelopment) {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            // Eliminate comments
            comments: false,
            // Compression specific options
            compress: {
                // remove warnings
                warnings: false,
                // Drop console statements
                drop_console: true
            },
        }));
    }
    return config;
}
