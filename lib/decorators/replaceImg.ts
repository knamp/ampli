import IDocument from '../interfaces/IDocument'
import IElementAttribute from '../interfaces/IElementAttribute'
import { createElement } from '../utis'

const addAllAttributes = (
  element: HTMLElement,
  image: HTMLElement
): HTMLElement => {
  const attributes: NamedNodeMap = image.attributes

  Array.from(attributes).forEach((attribute) => {
    element.setAttribute(attribute.nodeName, attribute.nodeValue || '')
  })

  return element
}

export default (
  context: IDocument
): IDocument => {
  const elements = context.document.querySelectorAll('img')

  elements.forEach((image: HTMLImageElement) => {
    const element: HTMLElement = createElement(
      context,
      'amp-img',
      element => addAllAttributes(element, image)
    )

    if (image.parentNode) {
      image.parentNode.insertBefore(element, image)
    }

    image.remove()
  })

  return context
}
