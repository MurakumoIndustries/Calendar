const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log("webpack.dev");
module.exports = merge(common, {
    mode: 'development',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: 'inline-source-map',
    //plugins: [
    //    new BundleAnalyzerPlugin({
    //        analyzerPort: 'auto'
    //    })
    //]
});