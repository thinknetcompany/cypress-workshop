/*
 * จำเป็นที่ต้องดึงมาจาก Cypress.env
 * เพราะ Chrome กับ cypress-node คนละ environment
 * เลยใช้เทคนิคส่ง process.env ไปใน Cypress.env
 * โดยฉีด process.env ในไฟล์ `cypress/plugins/dotenv.js` (process by node)
*/

export const URL = Cypress.env('LANGUAGE') === 'TH' ? Cypress.env('URL_TH') : Cypress.env('URL_EN')
export const LANGUAGE = Cypress.env('LANGUAGE')
export const URL_TH = Cypress.env('URL_TH')
export const URL_EN = Cypress.env('URL_EN')
export const API_TESTING_SECRET_TOKEN = Cypress.env('API_TESTING_SECRET_TOKEN')
export const API_DOMAIN = Cypress.env('API_DOMAIN')

Cypress.config('baseUrl', URL)

export const VIEWPORT_LIST = [
  ['Desktop', 'macbook-13'],
  ['Mobile', 'iphone-6'],
]
