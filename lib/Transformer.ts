import {
  addAmpBoilerplate,
  addAmpScript,
  addCharset,
  addViewport,
  insertStyles,
  keepWhitelistedTags,
  removeBlacklistedAttributes,
  replaceElement,
  replaceImg,
  setAmpOnHtml,
} from './decorators'

import convertToDom from './convertToDom'
import strip from './strip'
import IDocument from './interfaces/IDocument'
import { walkTheTree } from './utis'

export default class Transformer {
  private html: string = ''
  private additionalDecorators: Function[] | undefined
  private additionalTags: string[] | undefined
  private document: IDocument = {
    jsdom: null,
    window: null,
    document: null,
  }

  constructor(
    additionalDecorators?: Function[],
    additionalTags?: string[]
  ) {
    this.additionalDecorators = additionalDecorators
    this.additionalTags = additionalTags
  }

  public async transform(
    html: string,
  ): Promise<string> {
    this.html = html

    this.document = await convertToDom(html)

    return await this.transformDocumentToAmp()
  }

  private async transformDocumentToAmp(): Promise<string> {
    let document: IDocument = this.document;

    // Order matters
    const decorators = [

      // Set AMP attribute on HTML element
      setAmpOnHtml,

      // Strip scripts
      (document: IDocument): IDocument => strip(document, 'script'),

      // Set charset
      addCharset,

      // Add Viewport
      addViewport,

      // Replace external stylesheets, replace inline styles
      insertStyles,

      // Add AMP Boilerplate
      addAmpBoilerplate,

      // Add AMP script
      addAmpScript,

      // Replace <img> with <amp-img>, set width and height for images
      replaceImg,

      // Replace <iframe> with <amp-iframe>
      (document: IDocument): Promise<IDocument> => (
        replaceElement(document, 'iframe', 'amp-iframe')
      ),

      // @TODO Include canonical link

      (context: IDocument) => {
        walkTheTree(context.document, (element: HTMLElement) => {
          keepWhitelistedTags(element);
          removeBlacklistedAttributes(element);
        })

        return context
      }
    ]

    // Apply decorators
    for (const decorator of decorators) {
      document = await decorator(document)
    }

    // Additional decorators
    if (this.additionalDecorators && this.additionalDecorators.constructor === Array) {
      for (const decorator of this.additionalDecorators) {
        document = await decorator(document)
      }
    }

    // Export full HTML
    return document.jsdom.serialize()
  }
}
