import { t } from '../../../support/locales'
import { LANGUAGE, VIEWPORT_LIST } from '../../../configs'
import home from '../../../fixtures/data/home/elements.json'

describe(`${LANGUAGE} | Test Profile page`, () => {
  beforeEach(() => {
    cy.logout()
    cy.serviceUserDelete()
    cy.serviceUserCreateAndLogin()
  })

  VIEWPORT_LIST.forEach(([size, viewport]) => {
    describe(`On | ${size}`, () => {
      beforeEach(() => {
        cy.viewport(viewport)
        cy.visit('/')
      })

      it('Should show as expect', () => {
        // cy.get(home.EMAIL_LABEL).should('contain.text', '1234') /* Test Error Naa */
        cy.get(home.EMAIL_LABEL).should('contain.text', t('common.user.email'))
        cy.get(home.NICKNAME_LABEL).should('contain.text', t('common.user.nickname'))
        cy.get(home.AVATAR_IMAGE).invoke('attr', 'src').should('contain', ';base64,')
        cy.get(home.ABOUT_BUTTON).should('be.visible')
        cy.get(home.SIGN_OUT_BUTTON).should('be.visible')
      })
    })
  })
})
