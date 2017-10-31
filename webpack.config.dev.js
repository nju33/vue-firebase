const {DefinePlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const firebaseToolsConfig = require('firebase-tools/lib/config');
const superstatic = require('superstatic');

const firebaseConfig = firebaseToolsConfig.load({cwd: __dirname});

module.exports = {
  target: 'web',
  devtool: 'eval-source-map',
  entry: __dirname + '/src/index.tsx',
  output: {
    path: __dirname + '/tmp',
    filename: 'authentication.js',
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
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    before(app) {
      console.log(app.use);
      app.use(superstatic({config: firebaseConfig.data.hosting}));
    },
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/dev.html',
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
