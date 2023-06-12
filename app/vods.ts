import { Vod } from './models/vod'

export interface VodDto {
  id: string
  date: string
  hour: string
  provider: string
  url: string
}

export function transformVod(vod: Vod): VodDto {
  return {
    id: vod.id,
    date: vod.date,
    hour: vod.hour,
    provider: vod.provider,
    url: encodeURI(`https://omnimirror.net/old/${vod.date}/${vod.id}`)
  }
}
