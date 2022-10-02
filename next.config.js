const path = require('path');
module.exports = {
  i18n: {
    locales: ['default', 'ru', 'en-us'],
    defaultLocale: 'default',
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
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};
