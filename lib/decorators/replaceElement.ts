import IDocument from '../interfaces/IDocument'
import { createElement } from '../utis'

const addAllAttributes = (
  element: HTMLElement,
  initialElement: HTMLElement
): HTMLElement => {
  const attributes: NamedNodeMap = initialElement.attributes

  Array.from(attributes).forEach((attribute) => {
    element.setAttribute(attribute.nodeName, attribute.nodeValue || '')
  })

  return element
}

export default async (
  context: IDocument,
  elementName: string,
  newElementName: string,
  getAddtionalAttributes?: Function,
): Promise<IDocument> => {
  const elements: NodeListOf<HTMLImageElement> =
    context.document.querySelectorAll(elementName)
  const elementsArray = Array.from(elements)

  for (const initialElement of elementsArray) {
    const element: HTMLElement = await createElement(
      context,
      newElementName,
      async element => {
        element = await addAllAttributes(element, initialElement)

        if (typeof getAddtionalAttributes === 'function') {
          element = await getAddtionalAttributes(element, initialElement)
        }

        return element
      }
    )

    if (initialElement.parentNode) {
      initialElement.parentNode.insertBefore(element, initialElement)
    }

    initialElement.remove()
  }

  return context
}
