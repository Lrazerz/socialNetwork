const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: 2,
    poolTimeout: Infinity, // local is watch
    name: 'pool',
  },
};

// todo prod config
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.gif'],
    // to resolve paths from tsconfig.json, also it's possible to manually write such a function
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            // runtime: automatic for react17 transformations
            presets: ['@babel/preset-env', ['@babel/preset-react', { 'runtime': 'automatic' }]],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          threadLoader,
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    // to serve all relative routes, not just '/'
    historyApiFallback: true,
  },
  plugins: [
    // clean files on rebuild
    new CleanWebpackPlugin(),
    // inject script to that file
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
  ],
};
