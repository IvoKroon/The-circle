const path = require('path');

const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// const dir = path.resolve(`${__dirname}/..`);
const buildDirectoryName = './dist';
// const distDirectory = path.resolve(dir, buildDirectoryName);

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
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader',
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
    contentBase: buildDirectoryName,
    publicPath: '/',
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    stats: 'minimal',
    open: true,
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
