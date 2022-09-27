import Script from 'next/script'
import Header from '../components/header'
import Hero from '../components/hero'

import Terms from '../components/terms'
import Footer from '../components/footer'

export default function Term() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-F39FHRG5VW" />
      <Script src="/static/js/ga.js" />
      <Script src="/static/js/nav.js" />
      <Header showDashboard={false} loggedIn={false} />
      <Terms />
      <Footer />
    </>
  )
}
