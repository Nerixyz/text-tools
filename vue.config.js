const WorkerPlugin = require('worker-plugin');

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [new WorkerPlugin()],
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.configFile = '.eslintrc.js';
        return options;
      });
  },
};
