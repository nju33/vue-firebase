const {DefinePlugin} = require('webpack');
const {
  CheckerPlugin,
  TsConfigPathsPlugin,
} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: false,
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
    new TsConfigPathsPlugin({
      context: __dirname,
      tsconfig: __dirname + '/tsconfig.build.json',
      configFileName: 'tsconfig.build.json',
      compiler: 'typescript',
    }),
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
