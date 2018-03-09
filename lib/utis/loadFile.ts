import * as request from 'request-promise-native'

export default async (href: string): Promise<string> => {
  try {
    const response = await request(href)

    return response.toString();
  } catch (err) {
    console.error(err)
  }

  return Promise.resolve('')
}
