import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = []

export async function createUser({
  email, password, avatar, nickname,
}) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    nickname,
    email,
    avatar,
    hash,
    salt,
  }

  // This is an in memory store for users, there is no data persistence without a proper DB
  users.push(user)

  return user
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  return users.find((user) => user.email === email)
}

// Here you should lookup for the user in your DB
export async function getUsers() {
  // This is an in memory store for users, there is no data persistence without a proper DB
  return users
}

// Here you should delete test for the user in your DB
export async function deleteTestUser({ email }) {
  if (!/^testuser/.test(email)) {
    throw new Error('WRONG_PREFIX_EMAIL')
  }
  // This is an in memory store for users, there is no data persistence without a proper DB
  await users.splice(users.findIndex((user) => user.email === email), 1)

  return true
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}