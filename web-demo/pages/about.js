import Link from 'next/link'

export default () => (
  <div>
    Welcome to the about page. Go to the
    {' '}
    <Link href="/">
      <a id="about-home-button">Home</a>
    </Link>
    {' '}
    page.
  </div>
)
