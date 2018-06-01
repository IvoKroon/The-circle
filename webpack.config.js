const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const moduleObj = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
      ],
    },
  ],
};

const client = {
  mode: 'none',
  entry: {
    client: './src/client/index.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: moduleObj,
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html',
    }),
  ],
};

const server = {
  mode: 'none',
  entry: {
    server: './src/server/index.js',
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: moduleObj,
  externals: [nodeExternals()],
};

module.exports = [client, server];
