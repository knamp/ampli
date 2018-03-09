import * as CleanCSS from 'clean-css'

import IDocument from '../interfaces/IDocument'

import {
  createElement,
  loadFile,
  getElementContent,
} from '../utis/'
import strip from '../strip'

const getInlineStyles = async (context: IDocument) => {
  const stylesheetContent: string[] = await getStylesheets(context)
  const styleElementContent: string[] = await getElementContent(context, 'style')

  return stylesheetContent.concat(styleElementContent).join(' ')
}

const getStylesheets = async ({ document }: IDocument): Promise<string[]> => {
  const stylesheetElements: NodeListOf<HTMLElement> =
    document.querySelectorAll('link[rel="stylesheet"]')
  const stylesheets: HTMLElement[] = Array.from(stylesheetElements);
  const promises: Promise<string>[] = stylesheets
    .map((stylesheet: HTMLElement) => {
      const href: string | null = stylesheet.getAttribute('href')

      if (!href) {
        return Promise.resolve('')
      }

      return loadFile(href)
    })

  try {
    return await Promise.all(promises);
  } catch (err) {
    console.error(err)
  }

  return []
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const styles: string = await getInlineStyles(context)
  const minifiedStyles: string = new CleanCSS().minify(styles).styles

  context = strip(context, 'style, link')

  const element: HTMLElement = createElement(context, 'style', (element) => {
    element.setAttribute('amp-custom', '')
    element.innerHTML = minifiedStyles

    return element
  })

  context.document.head.appendChild(element)

  return context
}
