'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./App/"

module.exports = {
    entry: [
        srcFolder + "index.jsx" 
    ], 
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: 'assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};