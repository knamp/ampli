import IDocument from './interfaces/IDocument'

import config from '../config'
import { createElement } from './utis/'
import { strip } from '.'

const addScript = (element: HTMLElement): HTMLElement => {
  element.setAttribute('src', config.ampScript)

  return element
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const element = createElement(context, "script", addScript)

  context.document.head.appendChild(element)

  return context
}
