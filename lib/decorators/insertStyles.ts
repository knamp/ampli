import * as Css from 'css'
import * as CleanCSS from 'clean-css'

import IDocument from '../interfaces/IDocument'

import {
  createElement,
  loadFile,
  getElementContent,
} from '../utis/'
import strip from '../strip'

const cleanCss: CleanCSS = new CleanCSS({
  level: 2
})

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

const filterRules = (rules: any[]): any[] => {
  return rules.map(rule => {

    // Remove @page, remove @media print
    if (['page'].indexOf(rule.type) > -1 || ['print'].indexOf(rule.media) > -1) {
      rule.rules = []

      return rule
    }

    if (rule.rules) {
      rule.rules = filterRules(rule.rules)

      return rule
    }

    if (rule.declarations) {
      rule.declarations = rule.declarations.map((declaration) => {
        if (declaration.value && declaration.value.indexOf('!important') > -1) {
          declaration.value = declaration.value.replace('!important', '')
        }

        return declaration
      })
    }

    return rule
  })
}

const filterStyles = (styles: string): string => {
  const ast = Css.parse(styles)

  ast.stylesheet.rules = filterRules(ast.stylesheet.rules)

  return Css.stringify(ast)
}

const filterAndMinifyStyles = (styles: string): string => {
  const filteredStyles = filterStyles(styles)
  const minified = cleanCss.minify(filteredStyles)

  return minified.styles
}

export default async (
  context: IDocument
): Promise<IDocument> => {
  const styles: string = await getInlineStyles(context)
  const minifiedStyles: string = filterAndMinifyStyles(styles)

  context = strip(context, 'style, link')

  const element: HTMLElement = await createElement(context, 'style', (element) => {
    element.setAttribute('amp-custom', '')
    element.innerHTML = minifiedStyles

    return element
  })

  context.document.head.appendChild(element)

  return context
}
