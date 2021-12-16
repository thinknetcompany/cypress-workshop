import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import {
  createUser, findUser, validatePassword, deleteTestUser, getUsers,
} from '../lib/user'
import { setLoginSession, getLoginSession } from '../lib/auth'
import { removeTokenCookie } from '../lib/auth-cookies'

const { API_TESTING_SECRET_TOKEN } = process.env

export const resolvers = {
  Query: {
    async users() {
      const users = await getUsers()
      return users
    },
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req)
        console.log('session', session)
        if (session) {
          const user = findUser({ email: session.email })
          console.log('user', user)
          return user
        }
        throw new Error('SESSION_NOT_FOUND')
      } catch (error) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in',
        )
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const {
        email, password, avatar, nickname,
      } = args.input
      const existingUser = await findUser({ email })
      if (existingUser) {
        throw new Error('EXISTING_EMAIL')
      }
      const user = await createUser({
        email, password, avatar, nickname,
      })

      const session = {
        id: user.id,
        email: user.email,
      }

      await setLoginSession(context.res, session)

      return { user }
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email })

      if (user && await validatePassword(user, args.input.password)) {
        const session = {
          id: user.id,
          email: user.email,
        }

        await setLoginSession(context.res, session)

        return { user }
      }

      throw new UserInputError('Invalid email and password combination')
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res)
      return true
    },
    async deleteTestUser(_parent, _args, context, _info) {
      console.log('API_TESTING_SECRET_TOKEN', API_TESTING_SECRET_TOKEN)
      console.log('context.req.headers[api-testing-secret-token]', context.req.headers['api-testing-secret-token'])
      if (context.req.headers['api-testing-secret-token'] !== API_TESTING_SECRET_TOKEN) {
        throw new Error('WRONG_TOKEN')
      }
      return deleteTestUser({ email: _args.email })
    },
  },
}

export default resolvers
