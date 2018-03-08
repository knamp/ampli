import { JSDOM } from 'jsdom'

import IDocument from './interfaces/IDocument'

const convertToDom = (html: string): IDocument => {
  if (!html || html.length === 0) {
    throw new Error('HTML not set')
  }

  const { window } = new JSDOM(html)

  return {
    window,
    document: window.document
  }
}

export default convertToDom
