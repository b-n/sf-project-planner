var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');

module.exports = {
    entry: {
        auth: './auth.js',
        projects: './projects',
        resources: './resources.js'
    },
    output: {
        libraryTarget: 'commonjs',
        path: '.webpack',
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                drop_debugger: true
            },
            mangle: false
        })
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: [
                'node_modules/',
                /_serverless.*$/
            ],
            loader: 'eslint-loader'
        }],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: __dirname,
                exclude: [
                    /node_modules/
                ]
            }
        ]
    }
};
