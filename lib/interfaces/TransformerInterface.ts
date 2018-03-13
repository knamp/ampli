import IOptions from './IOptions'
import IDocument from './IDocument'

export default interface TransformerInterface {
  html: string
  document: IDocument
  additionalDecorators?: Function[] | undefined
  additionalTags?: string[] | undefined
  options?: IOptions
}
