import IDocument from './interfaces/IDocument'

import { strip } from '.'

export default async (
  context: IDocument
): Promise<IDocument> => {
  const { document } = context
  const fragment = document.createDocumentFragment()

  const element = document.createElement("meta")
  element.setAttribute('charset', 'utf-8')

  context = await strip(context, 'meta[charset]')

  context.document.head.appendChild(element)

  return context
}
