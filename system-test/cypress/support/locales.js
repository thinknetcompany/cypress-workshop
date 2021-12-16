/* eslint-disable global-require */

import i18next from 'i18next'
import { LANGUAGE } from '../configs'

// eslint-disable-next-line import/no-mutable-exports
let t

i18next.init({
  lng: LANGUAGE.toLowerCase(),
  debug: true,
  returnObjects: true,
  joinArrays: false,
  resources: {
    en: {
      translation: {
        common: require('../fixtures/data/common/en.json'),
        signin: require('../fixtures/data/signin/en.json'),
        signup: require('../fixtures/data/signup/en.json'),
        user: require('../fixtures/data/home/en.json'),
      },
    },
    th: {
      translation: {
        common: require('../fixtures/data/common/th.json'),
        signin: require('../fixtures/data/signin/th.json'),
        signup: require('../fixtures/data/signup/th.json'),
        user: require('../fixtures/data/home/th.json'),
      },
    },
  },
}, (error, originalT) => {
  console.error(error)
  console.log('i18next initialized')
  // initialized and ready to go!
  t = originalT
})
export {
  t,
}
export default t
