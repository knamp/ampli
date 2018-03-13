import * as requestImageSize from 'request-image-size'
import * as isAbsoluteUrl from 'is-absolute-url'

import ContextInterface from '../interfaces/ContextInterface'
import IImageDimentions from '../interfaces/IImageDimentions'
import { createElement } from '../utis'
import { replaceElement } from '.'

const setLayout = (element: HTMLElement): HTMLElement => {
  element.setAttribute('layout', 'responsive')

  return element
}

const setDimentions = async (
  element: HTMLElement,
  image: HTMLImageElement
): Promise<HTMLElement> => {
  const src: string = image.src
  let dimentions: IImageDimentions = {
    width: 0,
    height: 0,
  }

  console.info(`Trying to fetch image ${src}`)

  if (!src.startsWith('data:') && isAbsoluteUrl(src)) {
    try {
      dimentions = await requestImageSize(image.src)
    } catch (error) {
      console.error(`Cannot get file ${image.src}`, error)
    }
  }

  element.setAttribute('width', `${dimentions.width}`)
  element.setAttribute('height', `${dimentions.height}`)
  element.setAttribute('layout', 'responsive')

  return element
}

export default async (
  context: ContextInterface
): Promise<ContextInterface> => {
  return replaceElement(
    context,
    'img',
    'amp-img',
    async (
      element: HTMLElement,
      initialElement: HTMLImageElement
    ): Promise<HTMLElement> => {
      element = setLayout(element)
      element = await setDimentions(element, initialElement)

      return element
    }
  )
}
