var nodeExternals = require('webpack-node-externals');

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
            },
            {
                test: /\.env.*/,
                loaders: ['file'],
                include: __dirname,
                exclude: [
                    /node_modules/
                ]
            }
        ]
    }
};
