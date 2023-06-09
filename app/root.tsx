import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import styles from './app.css'
import tailwind from './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: tailwind },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;900&display=swap'
  },
  { rel: 'stylesheet', href: 'https://vjs.zencdn.net/8.3.0/video-js.css' }
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Omni Vods',
  viewport: 'width=device-width,initial-scale=1'
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#292d3e] text-white">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
