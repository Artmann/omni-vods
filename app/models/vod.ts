import { BaseModel } from 'esix'

export type Provider = 'Kick' | 'Rumble' | 'Twitch' | 'Youtube'

export class Vod extends BaseModel {
  date = ''
  hour = ''
  provider: Provider = 'Kick'
}
