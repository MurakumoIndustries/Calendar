const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log("!!!RELEASE!!!");
module.exports = merge(common, {
    mode: 'production'
});