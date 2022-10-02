const path = require('path');
module.exports = {
  i18n: {
    locales: ['ru', 'en-us'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
  // trailingSlash: true,
  webpack: (config, { isServer }) => {
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
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  swcMinify: true,
};
