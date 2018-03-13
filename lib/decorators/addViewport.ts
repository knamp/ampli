import ContextInterface from '../interfaces/ContextInterface'

import { createElement } from '../utis/'
import strip from '../strip'

const addViewport = (element: HTMLElement): HTMLElement => {
  element.setAttribute('name', 'viewport')
  element.setAttribute('content', 'width=device-width, minimum-scale=1, initial-scale=1')

  return element
}

export default async (
  context: ContextInterface
): Promise<ContextInterface> => {
  const element = await createElement(context, "meta", addViewport)

  context = strip(context, 'meta[name="viewport"]')

  context.document.head.appendChild(element)

  return context
}
