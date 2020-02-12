const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          modules: {
            localIdentName: '[local]',
          },
        },
      },
      {
        loader: 'less-loader',
      },
    ],
    include: path.resolve(__dirname, '../src'),
    exclude: path.resolve(__dirname, '../node_modules'),
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    '@': require('path').resolve(__dirname, '../src'),
  };

  return config;
};
