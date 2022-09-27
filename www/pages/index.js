import Script from 'next/script'
import Header from '../components/header'
import Waves from '../components/waves'
import Hero from '../components/hero'
import UseCases from '../components/useCases'
import Webhook from '../components/webhook'
import Footer from '../components/footer'

export default function Home() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-F39FHRG5VW" />
      <Script src="/static/js/ga.js" />
      <Script src="/static/js/nav.js" />
      <Header />
      <Hero />
      <Waves />
      <UseCases />
      <Webhook />
      <Footer />
    </>
  )
}
