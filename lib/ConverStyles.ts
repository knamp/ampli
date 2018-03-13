import * as Css from 'css'
import * as CleanCSS from 'clean-css'
import StaticStyles, { Output as StaticStylesOutput } from 'static-styles'

import IDocument from './interfaces/IDocument'

import {
  loadFile,
  getElementContent,
} from './utis/'

export default class ConvertStyles {
  private cleanCss: CleanCSS
  private context: IDocument

  constructor(context: IDocument) {
    this.context = context
    this.cleanCss = new CleanCSS({
      level: 2
    })
  }

  private getInlineStyles = async () => {
    const stylesheetContent: string[] = await this.getStylesheets()
    const styleElementContent: string[] = await getElementContent(this.context, 'style')

    return stylesheetContent.concat(styleElementContent).join(' ')
  }

  private getStylesheets = async (): Promise<string[]> => {
    const { document } = this.context
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

  private filterRules = (rules: any[]): any[] => {
    return rules.map(rule => {

      // Remove @page, remove @media print
      if (['page'].indexOf(rule.type) > -1 || ['print'].indexOf(rule.media) > -1) {
        rule.rules = []

        return rule
      }

      if (rule.rules) {
        rule.rules = this.filterRules(rule.rules)

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

  private filterStyles(styles: string): string {
    const ast = Css.parse(styles)

    ast.stylesheet.rules = this.filterRules(ast.stylesheet.rules)

    return Css.stringify(ast)
  }

  public async get(): Promise<string> {
    const styles: string = await this.getInlineStyles()
    const filteredStyles: string = this.filterStyles(styles)
    const html: string = this.context.jsdom.serialize()
    const stylesInUse: StaticStylesOutput = StaticStyles(html, filteredStyles)
    const minifiedStyles = this.cleanCss.minify(stylesInUse.css);

    console.log('Cleaned styles from unused', stylesInUse.stats)
    console.log('Minified styles', minifiedStyles.stats)

    return minifiedStyles.styles
  }
}
