'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: 'https://www.easy-mock.com/mock/5a5c025b5af72a3a798dab5f/zyw'
})
