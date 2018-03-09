import * as request from 'request-promise-native'
import * as isAbsoluteUrl from 'is-absolute-url'

export default async (href: string): Promise<string> => {
  console.info(`Trying to fetch image ${href}`)

  if (!href.startsWith('data:') && isAbsoluteUrl(href)) {
    try {
      const response = await request(href)

      return response.toString();
    } catch (err) {
      console.error(err)
    }
  }

  return Promise.resolve('')
}
