import ContextInterface from "./ContextInterface";
import OptionsInterface from "./OptionsInterface";

export default interface TransformerInterface {
  html: string;
  context: ContextInterface;
  additionalDecorators?: Array<() => void> | undefined;
  options?: OptionsInterface;
}
