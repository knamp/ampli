import ContextInterface from "./ContextInterface";
import OptionsInterface from "./OptionsInterface";

export default interface TransformerInterface {
  html: string;
  document: ContextInterface;
  additionalDecorators?: Function[] | undefined;
  additionalTags?: string[] | undefined;
  options?: OptionsInterface;
}
