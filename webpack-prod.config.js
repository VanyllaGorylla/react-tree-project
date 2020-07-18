const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const baseConfig = require('./webpack.config');

baseConfig.mode = 'production';
baseConfig.output = {
  filename: 'index.bundle.js',
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'umd',
  library: 'react-tree-project',
  globalObject: 'this',
  umdNamedDefine: true
};
baseConfig.plugins.push(
  new FileManagerPlugin({
    onStart: {
      delete: ['./dist']
    },
    onEnd: {
      copy: [{ source: './src/style', destination: './dist/style' }]
    }
  })
);

module.exports = baseConfig;
