import { ReactElement } from 'react'

export default function SignIn(): ReactElement {
  return (
    <form action="/auth/google" method="post">
      <button>Sign in with Google</button>
    </form>
  )
}
