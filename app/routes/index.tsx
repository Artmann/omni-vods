import { LoaderFunction } from '@remix-run/node'
import type { ReactElement } from 'react'

import { currentUser } from '~/services/session.server'

export const loader: LoaderFunction = async({ request }) => {
  const user = await currentUser(request)

  return null
}

export default function Index(): ReactElement {
  return (
    <div className='p-8 border-box mx-auto w-full max-w-5xl'>
      Hello World
    </div>
  )
}
