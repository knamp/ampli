import * as fs from 'fs'
import * as path from 'path'
import Ampli from '../'

const inputArguments: string[] = process.argv.slice(2)

if (!inputArguments[0]) {
  throw new Error('No file provided')
}

const file: string = inputArguments[0]
const filePath: string = path.resolve(__dirname, '../../__tests__/data/', file)

fs.readFile(filePath, (err, content: Buffer): Promise<string> => {
  if (err) {
    throw new Error(err.message)
  }

  const html = content.toString();
  const amp: Promise<string> = new Ampli().transform(html)

  return amp
    .then((amp) => {
      console.log(amp)

      return amp;
    })
    .catch((err) => {
      throw new Error(err)
    })
})
