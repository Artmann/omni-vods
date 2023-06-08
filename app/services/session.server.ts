import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'

import { UserDto, UserService } from './user.server'

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session', // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [ process.env.SESSION_SECRET ?? '' ], // replace this with an actual secret
    secure: process.env.NODE_ENV === 'production' // enable this in prod only
  }
})

export const { getSession, commitSession, destroySession } = sessionStorage

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID ?? '',
    clientSecret: process.env.GOOGLE_SECRET ?? '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:3000/auth/google/callback'
  },

  async ({accessToken, refreshToken, extraParams, profile}) => {
    const email = profile.emails[0].value
    const { givenName, familyName } = profile.name
    const name = `${givenName} ${familyName}`

    const user = await new UserService().findOrCreate(email, name)

    return user
  }
)

export const authenticator = new Authenticator<UserDto>(sessionStorage)

authenticator.use(googleStrategy)

export async function currentUser(request: Request): Promise<UserDto> {
  return authenticator.isAuthenticated(request.clone(), {
    failureRedirect: '/sign-in'
  })
}
