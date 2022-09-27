import { useState } from 'react'

export default function TokenForm(props) {

  const [token, setToken] = useState('')

  return (
    <div className="pt-24 w-[900px] m-auto">
      <div className="px-8 my-40">
        <div className="flex justify-center">
          <div className="inline-block my-2 px-2 block text-white-900 text-sm font-bold">
            Enter your token
          </div>
          <div className="inline-block">
            <input className="w-[150px] shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setToken(e.target.value)} />
          </div>
          <div className="mb-6 inline-block">
            <button className="bg-white-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => { props.login(token) }}>
              Go !
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
