import { LoaderFunction } from '@remix-run/node'
import type { ReactElement } from 'react'
import { VideoPlayer } from '~/components/video-player'

export const loader: LoaderFunction = async () => {
  return null
}

export default function Index(): ReactElement {
  return (
    <div className="p-8 border-box mx-auto w-full max-w-5xl">
      Hello World
      <VideoPlayer url="https://omnimirror.net/old/2023-06-10/2023-06-10_20-%5BKICK%5D.mp4" />
    </div>
  )
}
