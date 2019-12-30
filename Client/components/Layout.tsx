import React from 'react'
import Nav from './nav/Nav'
import Head from 'next/head'
import Footer from './Footer'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Macros' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <div id="pageContent">{children}</div>
      <Footer />
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Open Sans', sans-serif;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
          font-weight: lighter;
        }
        #pageContent {
          padding: 8rem 1rem;
        }
      `}</style>
    </div>
  )
}
export default Layout
