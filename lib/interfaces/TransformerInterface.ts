import OptionsInterface from './OptionsInterface'
import ContextInterface from './ContextInterface'

export default interface TransformerInterface {
  html: string
  document: ContextInterface
  additionalDecorators?: Function[] | undefined
  additionalTags?: string[] | undefined
  options?: OptionsInterface
}
