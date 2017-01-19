var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        handler: './handler.js'
    },
    output: {
        libraryTarget: 'commonjs',
        path: '.webpack',
        filename: '[name].js'
    },
    target: 'node',
    devtool: 'source-map',
    externals: [nodeExternals()],
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
