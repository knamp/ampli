import { JSDOM } from 'jsdom'

import IDocument from './interfaces/IDocument'

const convertToDom = (html: string): IDocument => {
  if (!html || html.length === 0) {
    throw new Error('HTML not set')
  }

  const jsdom = new JSDOM(html)

  return {
    jsdom,
    window: jsdom.window,
    document: jsdom.window.document
  }
}

export default convertToDom
