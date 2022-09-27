
import { useState, useEffect } from 'react'

export default function Info(props) {

    const token = props.token
    const [info, setInfo] = useState({})

    // Get webhook's info
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/wh/info', {
                headers: { 'Authorization': 'Bearer ' + token }
            })

            const info = await res.json();
            console.log(info)
            setInfo(info)
        }
        fetchData()
    }, []);

    if (Object.keys(info).length === 0) {
        return (
            <div className="pt-24">
                <div className="overflow-hidden bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 p-8">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="bg-white h-12 rounded-md">
                            <div className="text-center pl-2 uppercase text-sm text-indigo-500 font-semibold">Name</div>
                            <div className="text-center pl-2 text-black">...</div>
                        </div>
                        <div className="bg-white h-12 rounded-md">
                            <div className="text-center pl-2 uppercase text-sm text-indigo-500 font-semibold">Token</div>
                            <div className="data-history-items-nbr text-center pl-2 text-black">...</div>
                        </div>
                        <div className="bg-white h-12 rounded-md">
                            <div className="text-center pl-2 uppercase text-sm text-indigo-500 font-semibold">Creation date</div>
                            <div className="text-center pl-2 text-black">...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24">
            <div className="overflow-hidden bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 p-8">
                <div className="grid md:grid-cols-3 gap-5">
                    <div className="bg-white h-12 rounded-md">
                        <div className="text-center pl-2 uppercase text-sm text-indigo-500 font-semibold">Name</div>
                        <div className="text-center pl-2 text-black">{info.info.name}</div>
                    </div>
                    <div className="bg-white h-12 rounded-md">
                        <div className="text-center pl-2 uppercase text-sm text-indigo-500 font-semibold">Token</div>
                        <div className="text-center pl-2 text-black">{token}</div>
                    </div>
                    <div className="bg-white h-12 rounded-md">
                        <div className="text-center pl-2 uppercase text-sm text-indigo-500 font-semibold">Creation date</div>
                        <div className="text-center pl-2 text-black">{info.info.created_at.substr(0, 19).replace("T", " ")}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


