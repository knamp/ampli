import IDocument from '../interfaces/IDocument'

import { createElement } from '../utis/'
import strip from '../strip'

const addViewport = (element: HTMLElement): HTMLElement => {
  element.setAttribute('charset', 'width=device-width, minimum-scale=1, initial-scale=1')

  return element
}

export default (
  context: IDocument
): IDocument => {
  const element = createElement(context, "meta", addViewport)

  context = strip(context, 'meta[viewport]')

  context.document.head.appendChild(element)

  return context
}
