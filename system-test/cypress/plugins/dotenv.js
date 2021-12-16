/* eslint-disable prefer-object-spread */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */

/**
 * Cypress dotenv plugin
 *
 * @param {object} cypressConfig - The cypress config object
 * @returns {object} The cypress config with an augmented `env` property
 */
module.exports = (cypressConfig) => {
  console.log('cypressConfig.env', cypressConfig.env)
  console.log('--- dotenv --- ', require('dotenv').config())
  const processEnv = {}
  Object
    .entries(process.env)
    .forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        processEnv[key] = value
      }
    })

  // cypressConfig.env.LANGUAGE = process.env.LANGUAGE
  // cypressConfig.env.URL_TH = process.env.URL_TH
  // cypressConfig.env.URL_EN = process.env.URL_EN
  // cypressConfig.env.API_TESTING_SECRET_TOKEN = process.env.API_TESTING_SECRET_TOKEN
  // cypressConfig.env.API_DOMAIN = process.env.API_DOMAIN
  // cypressConfig.env.URL = process.env.LANGUAGE === 'th' ? process.env.URL_TH : process.env.URL_EN

  const newCypressConfig = Object.assign({}, cypressConfig, {
    env: processEnv,
  })

  return newCypressConfig
}
