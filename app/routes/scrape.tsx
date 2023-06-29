import { LoaderFunction, json } from '@remix-run/server-runtime'

import { VodService } from '~/services/vods.server'

export const loader: LoaderFunction = async () => {
  const vodService = new VodService()

  await vodService.updateVods()

  return json({ message: 'Vods updated.' })
}
