import Link from 'next/link'

const APP_VERSION = process.env.APP_VERSION;

export default function Footer() {
  return (
    <footer className="bg-white">
      <ul className="pl-2">
        <li className="inline-block mr-2">
          <a className="text-black no-underline text-sm">
          { APP_VERSION }
          </a>
        </li>
        <li className="inline-block mr-2">
          <Link href="/terms">
            <a className="text-black no-underline hover:text-pink-500">Terms</a>
          </Link>
        </li>
        <li className="inline-block mr-2 ">
          <a className="text-black no-underline hover:text-pink-500" href="mailto:contact@webhooks.app">
            Contact
          </a>
        </li>

        <li className="inline-block float-right mr-2">
          <a href="https://www.freepik.com/free-photos-vectors/background" className="text-gray-500">Background vector by freepik.com</a>
        </li>
      </ul>
    </footer>
  )
}
