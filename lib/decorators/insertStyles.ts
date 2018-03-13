import ContextInterface from '../interfaces/ContextInterface'

import { createElement } from '../utis/'
import strip from '../strip'
import ConvertStyles from '../ConverStyles'

export default async (
  context: ContextInterface
): Promise<ContextInterface> => {
  const styles: string = await new ConvertStyles(context).get()

  context = strip(context, 'style, link')

  const element: HTMLElement = await createElement(context, 'style', (element) => {
    element.setAttribute('amp-custom', '')
    element.innerHTML = styles

    return element
  })

  context.document.head.appendChild(element)

  return context
}
