import IDocument from '../interfaces/IDocument'

import config from '../../config'
import { createElement } from '../utis/'

const addScript = (element: HTMLElement): HTMLElement => {
  element.setAttribute('async', '')
  element.setAttribute('src', config.ampScript)

  return element
}

export default (
  context: IDocument
): IDocument => {
  const element = createElement(context, "script", addScript)

  context.document.head.appendChild(element)

  return context
}
