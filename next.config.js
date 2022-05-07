const prismic = require('@prismicio/client');

const sm = require('./sm.json');

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
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
};
