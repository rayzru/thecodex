const path = require('path')
const withReactSvg = require('next-react-svg')
const withSourceMaps = require('@zeit/next-source-maps')()

module.exports = withSourceMaps(withReactSvg({
  target: 'serverless',
  include: path.resolve(__dirname, '/static/icons'),
}));
