import { createRequestHandler } from '@remix-run/express'
import compression from 'compression'
import { config } from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import path from 'path'
import serverTiming from 'server-timing'

import { VodService } from './app/services/vods.server'

config()

const BUILD_DIR = path.join(process.cwd(), 'build')

const vodService = new VodService()

async function updateVodsLoop(): Promise<void> {
  while (true) {
    await vodService.updateVods()

    await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * 5))
  }
}

updateVodsLoop()

const app = express()

app.use(compression())
app.use(serverTiming())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

// Remix fingerprints its assets so we can cache forever.
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' })
)

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }))

app.use(morgan('tiny'))

app.all('*', (request: Request, response: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    purgeRequireCache()
  }

  return createRequestHandler({
    build: require(BUILD_DIR),
    mode: process.env.NODE_ENV
  })(request, response, next)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

function purgeRequireCache() {
  // purge require cache on requests for 'server side HMR' this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}
