const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

console.log("!!!RELEASE!!!");
module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            )
        }]
    }

});