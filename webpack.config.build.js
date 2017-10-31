const {DefinePlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: __dirname + '/src/components/firebase',
  output: {
    path: __dirname + '/dist',
    filename: 'firebase.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js', '.vue'],
    alias: {
      components: __dirname + '/src/components',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
      },
    }),
    new BabiliWebpackPlugin({
      removeConsole: true,
      removeDebugger: true,
    }),
  ],
};
