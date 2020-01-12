const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
//const isDev = process.env.NODE_ENV !== 'production'
console.log(process.env.NODE_ENV);

module.exports = {
    entry: {
        data: './src/js/data.js',
        main: './src/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs')
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            //chunks: 'all'
        }
    },
    module: {
        rules: [{
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //hmr: isDev,
                        },
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                    },
                    extractCSS: true,
                    // other vue-loader options go here
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.nojekyll']
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new WebpackPwaManifest({
            name: "MI|Calendar",
            short_name: "MI|Calendar",
            theme_color: "#FAFAFA",
            background_color: '#FAFAFA',
            icons: [{
                    src: path.resolve('./src/img/murakumo.svg'),
                    sizes: [96, 128, 192, 256, 384, 512, 1024] // multiple sizes
                },
                {
                    src: path.resolve('./src/img/murakumo.png'), //fallback for chrome
                    sizes: [96, 128, 192, 256, 384, 512, 1024]
                }
            ]
        }),
        new OfflinePlugin({
            appShell: '/Calendar/',
            autoUpdate: true,
            ServiceWorker: {
                cacheName: "MI_Calendar",
                events: true,
                entry: path.join(__dirname, './src/js/sw-img.js')
            },
            AppCache: false,
        })
    ]
};