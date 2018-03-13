import * as fs from 'fs'
import * as path from 'path'
import Ampli, { ContextInterface } from '../'

const inputArguments: string[] = process.argv.slice(2)

if (!inputArguments[0]) {
  throw new Error('No file provided')
}

const file: string = inputArguments[0]
const filePath: string = path.resolve(__dirname, '../../__tests__/data/', file)
const outputPath: string = path.resolve(__dirname, `amp-${file}`)

fs.readFile(filePath, async (err, content: Buffer): Promise<string> => {
  if (err) {
    throw new Error(err.message)
  }

  const html = content.toString();
  const ampli: Ampli = new Ampli()
  const amp: string = await ampli.transform(html)

  fs.writeFileSync(outputPath, amp)
  console.log(`Generated File: ${outputPath}`)

  return amp
})
