const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'cheap-module-eval-source-map',
  stats: 'minimal',

  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 8081,
  },

  entry: {
    example: [__dirname],
  },

  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        include: [__dirname, path.resolve(__dirname, '../src')],
      },
      {
        test: /\.svg$/,
        use: ['svg-react-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'assets/index.html'),
    }),
  ],

  resolve: {
    alias: {
      example: __dirname,
      src: path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = config;
