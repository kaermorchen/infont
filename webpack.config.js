const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  const entry = {
    app: './src/index.ts',
  };

  const plugins = [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   excludeChunks: ['tests'],
    // }),
  ];

  // Include tests in development builds
  if (!IS_PRODUCTION) {
    entry.tests = glob.sync('./tests/**/*.test.js');

    // plugins.push(
    //   new HtmlWebpackPlugin({
    //     filename: 'tests/index.html',
    //     template: './tests/index.html',
    //     inject: 'head',
    //     chunks: ['tests'],
    //   })
    // );
  }

  return {
    mode: IS_PRODUCTION ? 'production' : 'development',
    entry,
    plugins,
    module: {
      rules: [
        {
          test: /\.(js|mjs|ts|gts|gjs)$/,
          use: ['babel-loader'],
        },
        // {
        //   test: /\.css$/,
        //   use: ['style-loader', 'css-loader'],
        // },
        // {
        //   test: /\.(png|svg|jpg|gif)$/,
        //   loader: 'file-loader',
        //   options: {
        //     outputPath: 'images',
        //   },
        // },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.gts', '.gjs'],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    // devServer: {
    //   contentBase: path.resolve(__dirname, 'dist'),
    // },
  };
};
