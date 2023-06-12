import { useLoaderData } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/server-runtime'
import { ReactElement } from 'react'

import { VideoPlayer } from '~/components/video-player'
import { Vod } from '~/models/vod'
import { VodDto, transformVod } from '~/vods'

interface LoaderData {
  vod: VodDto
}

export const loader: LoaderFunction = async ({
  params
}): Promise<LoaderData> => {
  const id = params.id as string

  const vod = await Vod.find(id)

  if (!vod) {
    throw new Error('VOD not found.')
  }

  return { vod: transformVod(vod) }
}

export default function VodRoute(): ReactElement {
  const { vod } = useLoaderData<LoaderData>()

  return (
    <div className="w-full h-screen">
      <VideoPlayer url={vod.url} />
    </div>
  )
}
