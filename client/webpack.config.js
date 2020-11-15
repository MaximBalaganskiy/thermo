/* eslint-disable import/no-nodejs-modules */
const path = require('path');
const webpack = require('webpack');
const { AureliaPlugin, GlobDependenciesPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const bundleOutputDir = './dist';

module.exports = (env, argv) => {
  if ((!argv || !argv.mode)) {
    argv = { mode: 'development' };
  }
  const production = argv.mode === 'production';
  const cssLoaders = [{ loader: 'css-loader', options: { esModule: false } }, 'postcss-loader'];
  const scssLoaders = [...cssLoaders, {
    loader: 'sass-loader', options: {
      implementation: require('sass'),
      sassOptions: {
        includePaths: [path.resolve('./node_modules')]
      }
    }
  }];

  return [{
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: { app: './src/main.ts' },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules']
    },
    output: {
      path: path.resolve(bundleOutputDir),
      filename: '[name].js',
      chunkFilename: '[name].js',
      pathinfo: false
    },
    module: {
      rules: [
        { test: /\.(woff|woff2)(\?|$)/, loader: 'url-loader?limit=1' },
        { test: /\.(png|eot|ttf|svg)(\?|$)/, use: { loader: 'url-loader', options: { limit: 1000, esModule: false } } },
        { test: /\.ts$/i, include: [/src/], use: { loader: 'ts-loader', options: { allowTsInNodeModules: false } } },
        { test: /\.html$/i, use: { loader: 'html-loader', options: { attributes: { list: [{ tag: 'img', attribute: 'src', type: 'src' }, { tag: 'app-nav-bar', attribute: 'logo-url', type: 'src' }] } } } },
        { test: /\.scss$/i, issuer: [{ test: /\.html$/i }], use: scssLoaders },
        { test: /\.scss$/i, issuer: [{ not: [{ test: /\.html$/i }] }], exclude: [/splash-progress\.scss$/], use: ['style-loader', ...scssLoaders] },
        { test: /splash-progress\.scss$/, issuer: [{ not: [{ test: /\.html$/i }] }], use: [{ loader: MiniCssExtractPlugin.loader }, ...scssLoaders] },
        { test: /\.css$/i, issuer: [{ test: /\.html$/i }], use: cssLoaders },
        { test: /\.css$/i, issuer: [{ not: [{ test: /\.html$/i }] }], use: ['style-loader', ...cssLoaders] }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        // uncomment the following to create a separate bundle for each npm module
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          // vendor: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name(module) {
          //     // get the name. E.g. node_modules/packageName/not/this/part.js
          //     // or node_modules/packageName
          //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

          //     // npm package names are URL-safe, but some servers don't like @ symbols
          //     return `npm.${packageName.replace('@', '').replace('google-analytics', 'gan')}`;
          //   }
          // }
        }
      }
    },
    performance: {
      hints: false
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.ejs', filename: 'index.html', chunks: ['app'], inject: true, alwaysWriteToDisk: true, minify: false }),
      new AureliaPlugin(),
      new GlobDependenciesPlugin({ 'main': ['src/{views,custom-elements,converters,attributes}/**/*.{ts,html}'] }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css'
      }),
      new webpack.NormalModuleReplacementPlugin(/environments\/environment/gi, `environments/${production ? 'production' : 'environment'}`)
    ]
  }];
};
