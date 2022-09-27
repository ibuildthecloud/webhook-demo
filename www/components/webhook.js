import { saveWebhookLocalInfo, getWebhookLocalInfo, createNewWebhook } from './helpers'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Webhook() {

    const [token, setToken] = useState('')
    const [name, setName] = useState('')

    // Get webhook from local storage
    useEffect(() => {
        const fetchData = async () => {
            const webhookLocalInfo = await getWebhookLocalInfo()
            console.log(webhookLocalInfo)
            if (webhookLocalInfo != null) {
                setToken(webhookLocalInfo["token"])
                setName(webhookLocalInfo["name"])
            }
        }
        console.log("webhook useEffect")
        fetchData()
    }, []);

    // Create new webhook
    const createWebhook = async () => {
        console.log("createWebhook")

        // Call API
        const webhookCreationInfo = await createNewWebhook();
        console.log(webhookCreationInfo)

        // Make sure webhook was correctly created
        if (webhookCreationInfo === null) {
            console.log("Error creating webhook")
            return
        }

        // Persist info in local storage
        saveWebhookLocalInfo(webhookCreationInfo["token"], webhookCreationInfo["name"])

        // Update state
        setToken(webhookCreationInfo["token"])
        setName(webhookCreationInfo["name"])
    }

    return (
        <section className="container mx-auto text-center py-6 mb-12">
            {!token &&
                <>
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
                        Check it out
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
                    </div>
                    <h3 className="my-4 text-3xl leading-tight">
                        Get your own secure webhook endpoint right now
                    </h3>
                    <div className="w-full px-8 pt-6 pb-8 my-4">
                        <button
                            className="inline-block py-2 px-4 text-black font-bold no-underline mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                            onClick={createWebhook}>
                            Get my webhook
                        </button>
                    </div>
                </>
            }
            {token &&
                <>
                    <h3 className="my-2 text-3xl leading-tight">
                        Your own webhook
                    </h3>
                    <div className="my-2 text-white leading-tight">
                        Use those information and follow the incoming data in the
                        <Link href="/dashboard" replace>
                            <a className="inline-block text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-2">
                                Dashboard
                            </a>
                        </Link>
                    </div>
                    <div className="mx-auto sm:w-1/2 h-16 bg-white rounded-md">
                        <div className="flex">
                            <div className="ml-2 w-20 text-left uppercase text-sm text-indigo-500 font-semibold">Name:</div>
                            <div className="text-black text-sm">{name}</div>
                        </div>
                        <div className="flex">
                            <div className="ml-2 w-20 text-left uppercase text-sm text-indigo-500 font-semibold">URL:</div>
                            <div className="text-black text-sm">{window.location.href}data</div>
                        </div>
                        <div className="flex">
                            <div className="ml-2 w-20 text-left uppercase text-sm text-indigo-500 font-semibold">Token:</div>
                            <div className="text-black text-sm">{token}</div>
                        </div>
                    </div>
                    <div className="mx-auto my-4 text-white leading-tight">
                        <div className="text-xs text-white">
                            Note: the token can be used as a Bearer in the "Authorization" header, or as the value of the "token" parameter in the query string.
                            Below is an example with a simple curl
                        </div>
                    </div>                     
                </>
            }
        </section >
    )
}