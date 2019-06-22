const compose = require('next-compose')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? './' : '',
  ...compose([
    [withCSS, {}],
    [withSass, {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
      }
    }],
    {
      webpack: (config) => {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        })
        return config
      }
    }
  ])
}