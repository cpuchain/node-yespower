const { BannerPlugin, ProvidePlugin } = require('webpack');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const rules = [
    {
        test: /\.ts?$/,
        loader: 'esbuild-loader',
        options: {
            loader: 'ts',
            target: 'ES2022',
        }
    }
]

const umdConfig = {
    mode: 'production',
    module: { rules },
    entry: './src/index.ts',
    output: {
        filename: 'yespower.umd.js',
        path: path.resolve(__dirname, './lib'),
        library: 'YespowerUmd',
        libraryTarget: 'umd'
    },
    plugins: [
        new NodePolyfillPlugin(),
        new ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        }),
        new BannerPlugin({
            banner: 'globalThis.process = { browser: true, env: {}, };',
            raw: true,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            fs: false,
            path: false,
        },
        fallback: {
            'process/browser': require.resolve('process/browser'),
        }
    },
    optimization: {
        minimize: false,
    },
};

module.exports = [
    umdConfig,
    {
        ...umdConfig,
        output: {
            filename: 'yespower.umd.min.js',
            path: path.resolve(__dirname, './lib'),
            library: 'YespowerUmd',
            libraryTarget: 'umd'
        },
        optimization: {},
    },
    {
        mode: 'production',
        module: { rules },
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './lib'),
            libraryTarget: 'commonjs'
        },
        target: 'node',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        optimization: {
            minimize: false,
        },
    },
]