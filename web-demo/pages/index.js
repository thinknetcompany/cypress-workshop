import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const QUERY_VIEWER = gql`
  query QueryViewer {
    viewer {
      id
      email
      avatar
      nickname
    }
  }
`

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(QUERY_VIEWER)
  const viewer = data?.viewer
  const shouldRedirect = !(loading || viewer) || error

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect])

  if (error) {
    return <p id="index-error-label">{error.message}</p>
  }

  if (viewer) {
    return (
      <div>
        {
          viewer.avatar ? (
            <img id="index-avatar-image" src={viewer.avatar} style={{ maxHeight: '10rem' }} alt="avatar" />
          ) : null
        }
        <br />
        You're signed in as
        {' '}
        <div id="index-email-label">{viewer.email}</div>
        {
          viewer.nickname ? (
            <div id="index-nickname-label">
              (
              {viewer.nickname}
              )
            </div>
          ) : null
        }
        <hr />
        {' '}
        goto
        {' '}
        <Link href="/about">
          <a id="index-about-button">about</a>
        </Link>
        {' '}
        page. or
        {' '}
        <Link href="/signout">
          <a id="index-signout-button">signout</a>
        </Link>
      </div>
    )
  }

  return <p id="index-loading">Loading...</p>
}

export default Index
