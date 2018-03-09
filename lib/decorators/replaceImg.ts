import * as requestImageSize from 'request-image-size'

import IDocument from '../interfaces/IDocument'
import IImageDimentions from '../interfaces/IImageDimentions'
import { createElement } from '../utis'

const setLayout = (element: HTMLElement): HTMLElement => {
  element.setAttribute('layout', 'responsive')

  return element
}

const setDimentions = async (
  element: HTMLElement,
  image: HTMLImageElement
): Promise<HTMLElement> => {
  let dimentions: IImageDimentions

  try {
    dimentions = await requestImageSize(image.src)
  } catch (error) {
    dimentions = {
      width: 0,
      height: 0,
    }

    console.error(`Cannot get file ${image.src}`, error)
  }

  element.setAttribute('width', `${dimentions.width}`)
  element.setAttribute('height', `${dimentions.height}`)
  element.setAttribute('layout', 'responsive')

  return element
}

const addAllAttributes = async (
  element: HTMLElement,
  image: HTMLImageElement
): Promise<HTMLElement> => {
  const attributes: NamedNodeMap = image.attributes

  element = setLayout(element)
  element = await setDimentions(element, image)

  Array.from(attributes).forEach((attribute) => {
    element.setAttribute(attribute.nodeName, attribute.nodeValue || '')
  })

  return element
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const elements: NodeListOf<HTMLImageElement> =
    context.document.querySelectorAll('img')
  const elementsArray = Array.from(elements)

  for (const image of elementsArray) {
    const element: HTMLElement = await createElement(
      context,
      'amp-img',
      async element => await addAllAttributes(element, image)
    )

    if (image.parentNode) {
      image.parentNode.insertBefore(element, image)
    }

    image.remove()
  }

  return context
}
