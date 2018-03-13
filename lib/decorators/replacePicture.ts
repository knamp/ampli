import ContextInterface from '../interfaces/ContextInterface'
import { addAllAttributes } from '../utis'
import { replaceElement } from '.'

export default async (
  context: ContextInterface
): Promise<ContextInterface> => {
  return replaceElement(
    context,
    'picture',
    'img',
    async (
      element: HTMLElement,
      initialElement: HTMLImageElement
    ): Promise<HTMLElement> => {
      const img = <HTMLElement> initialElement.querySelector('img')

      return addAllAttributes(element, img)
    }
  )
}
