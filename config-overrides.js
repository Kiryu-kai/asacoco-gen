const path = require('path');

// @see https://chaika.hatenablog.com/entry/2021/07/22/083000
module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, './src/'),
    },
  };

  return config;
};
