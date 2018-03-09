import IDocument from '../interfaces/IDocument'

import { createElement } from '../utis/'
import strip from '../strip'

const addViewport = (element: HTMLElement): HTMLElement => {
  element.setAttribute('name', 'viewport')
  element.setAttribute('content', 'width=device-width, minimum-scale=1, initial-scale=1')

  return element
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const element = await createElement(context, "meta", addViewport)

  context = strip(context, 'meta[name="viewport"]')

  context.document.head.appendChild(element)

  return context
}
