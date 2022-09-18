const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// nodejs获取相对路径
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath);
}

// 通用基础配置
const baseConfig = {
  context: resolve('../../src'),
  entry: {
    index: resolve('../../src/index.jsx'),
  },
  output: {
    path: resolve('../../dist'),
    // filename: '[name].js',
    // chunkFilename: 'chunks/[name].[hash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.sass'],
    alias: {
      '@src': path.join(__dirname, '../../src'),
      // 提取公共npm包去重失败，单独设置绝对路径
      immutable: path.resolve(process.cwd(), 'node_modules', 'immutable'),
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('../../src/index.html'),
      chunk: ['index'],
      hash: true, // 打包文件加上hash串
      scriptLoading: 'defer',
    }),

    // new ExtractTextWebpackPlugin('css/[name].css'),

    // 复制高度静态模板资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('../../src/resource/'),
          to: resolve('../../dist/resource/'),
        },
      ],
    }),

    new webpack.HotModuleReplacementPlugin(),

    // 将内联样式提取出来成样式文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 指定文件夹匹配文件
        exclude: /node_modules/,
        include: [resolve('../../src')],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(css|scss|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '../images/[name].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
      },
    ],
  },
};

// 开发环境配置
const devConfig = {
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,

    // 开发配置代理文件
    proxy: require('./dev.proxy'),
  },
};

// 生产环境配置，需要打包优化，代码分割，js、css再压缩
const prodConfig = {
  plugins: [
    // 打包分析插件，生产report文件
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      analyzerPort: 4000,
    }),

    // 按需加载特定第三方包
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),

    // 抽离第三方库
    // new AutoDllPlugin({
    //    inject: true,
    //    filename: '[name]_dll.js',
    //    entry: {
    //        third1: ['antd'],
    //        third2: ['moment', 'immutable', 'axios'],
    //       third3: ['react', 'react-dom', 'react-router', 'react-router-dom']
    //    }
    // })
  ],

  // 代码分割
  optimization: {
    // 压缩打包后的js、css文件
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {},
          compress: {},
          keep_fnames: false,
          safari10: false,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // 代码分割
    splitChunks: {
      chunks: 'all', // async 只分割异步导入代码 all 同步异步都分割
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: 'vendors',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          filename: 'vendors/[name].[contenthash:8].js',
          // reuseExistingChunk: true,
        },
      },
    },
  },
};

// 配置导出
// eslint-disable-next-line consistent-return
module.exports = (env) => {
  // nodejs命令，获取当前测试环境
  const {environment} = env;
  console.info(`当前测试环境: ${environment}`);

  if (environment === 'DEV') {
    // 合并开发配置与基础配置，导出配置
    return merge(baseConfig, devConfig);
  }

  if (environment === 'PRD') {
    // 合并生产配置与基础配置，导出配置
    return merge(baseConfig, prodConfig);
  }
};
