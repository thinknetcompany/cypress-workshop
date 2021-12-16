import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const MUTATION_SIGN_OUT = gql`
  mutation MutationSignOut {
    signOut
  }
`

function SignOut() {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(MUTATION_SIGN_OUT)

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push('/signin')
      })
    })
  }, [signOut, router, client])

  return <p id="signout-button">Signing out...</p>
}

export default SignOut
