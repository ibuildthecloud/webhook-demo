import { useState, useEffect } from 'react'
import Script from 'next/script'
import { getWebhookLocalInfo, saveWebhookLocalInfo, deleteWebhookLocalInfo, getWebhookRemoteInfo } from '../components/helpers'
import Header from '../components/header'
import TokenForm from '../components/tokenForm'
import Info from '../components/info'
import Messages from '../components/Messages'
import Example from '../components/example'
import Footer from '../components/footer'
import Waves from '../components/waves'

const isClientSide = typeof window !== 'undefined';

export default function Dashboard() {
  const [token, setToken] = useState(null)

  const handleLogin = async (whToken) => {
    console.log("handleLogin")
    console.log(whToken)

    // Do not go any further if token is empty
    if ((whToken === undefined) || (whToken === '')) {
      console.log("Token is empty")
      alert("Token must not be empty")
      return
    }

    // Check if webhook exists in database
    const webhookRemoteInfo = await getWebhookRemoteInfo(whToken)
    console.log("webhookRemoteInfo:")
    console.log(webhookRemoteInfo)
    if (webhookRemoteInfo != null) {
      console.log("webhook exists")
      console.log(webhookRemoteInfo["info"]["name"]);
      saveWebhookLocalInfo(whToken, webhookRemoteInfo["info"]["name"])
      setToken(whToken)
    } else {
      console.log("webhook does NOT exists")
      await handleLogout()
    }
  }

  const handleLogout = async () => {
    console.log("handleLogout")
    deleteWebhookLocalInfo()
    setToken(null)
  }

  // Check if token present in local storage
  useEffect(() => {
    const fetchData = async () => {
      const webhookLocalInfo = await getWebhookLocalInfo()
      if (webhookLocalInfo != null) {
        console.log("Local info")
        console.log(webhookLocalInfo)
        await handleLogin(webhookLocalInfo["token"])
      }
    }
    console.log("dashboard useEffect")
    fetchData()
  }, [token]);

  return token ? (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F39FHRG5VW" />
        <Script src="/static/js/ga.js" />
        <Script src="/static/js/nav.js" />
        <header className="w-full text-center p-4">
          <Header
            showDashboard={false}
            loggedIn={true}
            logout={() => {
              if (window.confirm("Make sure you saved your token as it will be removed from your browser's local storage")) handleLogout()
            }} />
          <Info token={token} />
          <Example token={token} />
        </header>
        <main className="flex-1 overflow-y-scroll">
          <div className="">
            {isClientSide && (
              <Messages
                token={token}
              />
            )}
          </div>
        </main>
        <Waves />
        <Footer />
      </div>
    </>
  ): (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F39FHRG5VW" />
        <Script src="/static/js/ga.js" />
        <Script src="/static/js/nav.js" />
        <header className="w-full text-center p-4">
          <Header showDashboard={false} loggedIn={false} />
        </header>
        <main className="flex-1 overflow-y-scroll">
          <TokenForm login={(whToken) => { handleLogin(whToken) }} />
        </main>
        <Waves />
        <Footer />
      </div>
    </>
  )
}
