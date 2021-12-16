import gql from 'graphql-tag'

export const typeDefs = gql`
  scalar Base64

  type User {
    id: ID!
    email: String!
    avatar: Base64
    nickname: String
    createdAt: Int!
  }

  input SignUpInput {
    email: String!
    nickname: String
    password: String!
    avatar: Base64
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    deleteTestUser(email: String!): Boolean!
    signOut: Boolean!
  }
`

export default typeDefs
