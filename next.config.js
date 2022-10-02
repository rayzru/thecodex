const path = require('path');

module.exports = {
  i18n: {
    locales: ['en-us', 'ru'],
    defaultLocale: 'ru',
    localeDetection: true,
  },
  // trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgo: false },
        },
      ],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};
