import addContext from 'mochawesome/addContext'
import { LANGUAGE } from '../configs'

// eslint-disable-next-line no-useless-escape
const REGEX_CLEAN_NAME = /[:|]/g

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
    addContext({ test }, `screenshots/${Cypress.spec.name}/${screenshotFileName}`.replace(REGEX_CLEAN_NAME, ''))
  }
  addContext({ test }, `videos_${LANGUAGE}/${Cypress.spec.name}.mp4`.replace(REGEX_CLEAN_NAME, ''))
})
