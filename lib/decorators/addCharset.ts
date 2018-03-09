import IDocument from '../interfaces/IDocument'

import { createElement } from '../utis/'
import strip from '../strip'

const addCharset = (element: HTMLElement): HTMLElement => {
  element.setAttribute('charset', 'utf-8')

  return element
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const element = await createElement(context, "meta", addCharset)

  context = strip(context, 'meta[charset]')

  context.document.head.appendChild(element)

  return context
}
