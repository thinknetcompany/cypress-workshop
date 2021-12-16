import { API_DOMAIN, API_TESTING_SECRET_TOKEN } from '../../../configs'
import { t } from '../../locales'

Cypress.Commands.add('serviceUserDelete', (email = t('common.user.email')) => {
  const query = `
    mutation (
      $email: String!,
    ) {
      deleteTestUser(email: $email)
    }
  `

  return cy.request({
    method: 'POST',
    url: API_DOMAIN,
    body: JSON.stringify({
      query,
      variables: {
        email,
      },
    }),
    headers: {
      'api-testing-secret-token': API_TESTING_SECRET_TOKEN,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    expect(response.body.errors, 'should deleteTestUser without error(s)').not.to.exist
    expect(response.body.data.deleteTestUser, 'should deleteTestUser success').to.eq(true)
    return response
  })
})

Cypress.Commands.add('serviceUserCreateAndLogin', ({
  email,
  password,
  nickname,
  avatar,
} = t('common.user')) => {
  const query = `
    mutation MutationSignUp($email: String!, $password: String!, $nickname: String, $avatar: Base64) {
      signUp(input: { email: $email, password: $password, nickname: $nickname, avatar: $avatar }) {
        user {
          id
          email
          nickname
        }
      }
    }
  `

  if (avatar) {
    cy.fixture(avatar).then((avatarBase64) => {
      cy.request({
        method: 'POST',
        url: API_DOMAIN,
        body: JSON.stringify({
          query,
          variables: {
            email,
            password,
            nickname,
            avatar: `data:image/png;base64,${avatarBase64}`,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  } else {
    cy.request({
      method: 'POST',
      url: API_DOMAIN,
      body: JSON.stringify({
        query,
        variables: {
          email,
          password,
          nickname,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
})
