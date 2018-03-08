import {
  addAmpBoilerplate,
  addAmpScript,
  addCharset,
  addViewport,
  setAmpOnHtml,
} from './lib/decorators'

import convertToDom from './lib/convertToDom'
import strip from './lib/strip'
import IDocument from './lib/interfaces/IDocument'

class Main {
  private html: string = ''
  private additionalDecorators: Function[] | undefined
  private document: IDocument = {
    jsdom: null,
    window: null,
    document: null,
  }

  public async transform(
    html: string,
    additionalDecorators?: Function[]
  ): Promise<string> {
    this.html = html
    this.additionalDecorators = additionalDecorators

    this.document = await convertToDom(html)

    return await this.transformDocumentToAmp()
  }

  private async transformDocumentToAmp(): Promise<string> {
    let document: IDocument = this.document;

    const decorators = [

      // Set AMP attribute on HTML element
      setAmpOnHtml,

      // Strip scripts
      (document) => strip(document, 'script'),

      // Set charset
      addCharset,

      // Add Viewport
      addViewport,

      // Add AMP Boilerplate
      addAmpBoilerplate,

      // Add AMP script
      addAmpScript,

      // @TODO Include canonical link
      // @TODO Replace external stylesheets
      // @TODO Replace <img> with <amp-img>
      // @TODO Set width and height for images
    ]

    // Apply decorators
    decorators.forEach(async (decorator: Function) => {
      document = await decorator(document)
    })

    // Additional decorators
    if (this.additionalDecorators && this.additionalDecorators.constructor === Array) {
      this.additionalDecorators.forEach(async (decorator: Function) => {
        document = await decorator(document)
      })
    }

    // Export full HTML
    return document.jsdom.serialize()
  }
}

export default Main
