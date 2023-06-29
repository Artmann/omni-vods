import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import { ReactElement } from 'react'

import { Vod } from '~/models/vod'
import { VodDto, transformVod } from '~/vods'

interface LoaderData {
  vods: VodDto[]
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const vods = await Vod.orderBy('date', 'desc').get()

  return { vods: vods.map(transformVod) }
}

export default function Index(): ReactElement {
  const { vods } = useLoaderData<LoaderData>()

  const dates = vods.map((vod) => vod.date)

  const vodsGroupedByDate = vods.reduce((acc, vod) => {
    const date = vod.date

    if (!acc[date]) {
      acc[date] = []
    }

    acc[date].push(vod)

    return acc
  }, {} as Record<string, VodDto[]>)

  return (
    <div className="p-8 border-box mx-auto w-full max-w-5xl">
      <h1 className="font-poppins text-3xl font-bold mb-8">Omni Vods</h1>
      <div className="flex flex-wrap gap-8">
        {dates.map((date) => (
          <div
            className="w-full max-w-xs"
            key={date}
          >
            <h2 className="text-xl text-gray-300 font-bold mb-3">
              {dayjs(date).format('dddd, MMMM DD')}
            </h2>
            <div className="flex flex-col gap-2">
              {(vodsGroupedByDate[date] ?? []).map((vod) => (
                <div
                  key={vod.id}
                  className="flex items-center gap-2"
                >
                  <img
                    alt={vod.provider}
                    className="w-6 h-auto rounded-md"
                    src={`/images/${vod.provider.toLowerCase()}.png`}
                  />
                  <Link
                    to={`/vods/${vod.id}`}
                    className="text-white hover:underline"
                  >
                    {`${vod.hour}:00`}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
