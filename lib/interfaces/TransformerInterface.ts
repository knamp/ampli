import IOptions from './IOptions'
import ContextInterface from './ContextInterface'

export default interface TransformerInterface {
  html: string
  document: ContextInterface
  additionalDecorators?: Function[] | undefined
  additionalTags?: string[] | undefined
  options?: IOptions
}
