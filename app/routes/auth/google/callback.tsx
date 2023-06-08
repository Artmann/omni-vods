import { LoaderFunction } from '@remix-run/node'

import { authenticator } from '~/services/session.server'

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate('google', request, {
    failureRedirect: '/sign-in',
    successRedirect: '/'
  })
}
