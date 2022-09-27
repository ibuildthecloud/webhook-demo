
import { useState, useEffect } from 'react'

export default function Example(props) {

    const token = props.token

    return (
            <div className="overflow-hidden bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 p-8">
                <div className="bg-white h-15 rounded-md">
                    <div className="ml-2 mb-2 text-left text-m text-black font-bold">
                        Send a simple payload with this curl command from a terminal:
                    </div>
                    <div className="ml-2 text-left text-m text-black">
                        curl -XPOST -H "Authorization: Bearer {token}" {window.location.protocol}//{window.location.host}/data -d '{'{'}"ok": "hello"{'}'}' -H 'Content-Type: application/json'
                    </div>
                </div>
            </div>
    )
}


