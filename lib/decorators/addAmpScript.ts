import ContextInterface from '../interfaces/ContextInterface'

import config from '../../config'
import { createElement } from '../utis/'

const addScript = (element: HTMLElement): HTMLElement => {
  element.setAttribute('async', '')
  element.setAttribute('src', config.ampScript)

  return element
}

export default async (
  context: ContextInterface
): Promise<ContextInterface> => {
  const element = await createElement(context, "script", addScript)

  context.document.head.appendChild(element)

  return context
}
