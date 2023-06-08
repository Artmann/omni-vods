import { ActionFunction, redirect } from '@remix-run/node'
import { authenticator } from '~/services/session.server'

export const loader = () => redirect('/sign-in')

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate('google', request, {
    failureRedirect: '/sign-in',
    successRedirect: '/'
  })
}
