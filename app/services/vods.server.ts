import { load } from 'cheerio'

import { Provider, Vod } from '../models/vod'

export class VodService {
  async updateVods(): Promise<void> {
    console.log('Updating VODs.')

    const dates = await this.fetchDates()

    for (const date of dates.reverse().slice(0, 14)) {
      console.log(`Fetching VODs for ${date}.`)

      const vods = await this.listVodsByDate(date)

      for (const vod of vods) {
        const existingVod = await Vod.find(vod.id)

        if (existingVod) {
          continue
        }

        console.log(`Creating VOD ${vod.id}.`)

        await Vod.create(vod)
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  private async listVodsByDate(date: string): Promise<any> {
    try {
      const response = await fetch(`https://omnimirror.net/old/${date}/`)
      const html = await response.text()

      const $ = load(html)
      const elements = $('pre a')

      const names = elements
        .map((index, element) => $(element).text())
        .filter((index, text) => text.endsWith('.mp4'))
        .get()

      const vods = names
        .map((name) => {
          const re = /^\d+-\d+-\d+_(\d+)-\[(\w+)\]\.mp4/
          const matches = name.match(re)

          if (!matches) {
            return
          }

          const [id, hour, provider] = matches

          return {
            id,
            date,
            hour,
            provider: provider as Provider
          }
        })
        .filter((vod) => Boolean(vod)) as Vod[]

      return vods
    } catch (error) {
      console.log(error)
    }

    return []
  }

  private async fetchDates(): Promise<string[]> {
    try {
      const response = await fetch('https://omnimirror.net/old/')
      const html = await response.text()

      const $ = load(html)
      const elements = $('pre a')

      const dates = elements
        .map((index, element) => $(element).text())
        .filter((index, text) => /(\d+\-\d+-\d+)\//.test(text))
        .map((index, text) => text.replace('/', ''))
        .get()

      return dates
    } catch (error) {
      console.log(error)

      throw new Error("We couldn't fetch list of VODs. Please try again.")
    }
  }
}
