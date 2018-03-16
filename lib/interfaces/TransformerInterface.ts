import ContextInterface from "./ContextInterface";
import OptionsInterface from "./OptionsInterface";

export default interface TransformerInterface {
  html: string;
  context: ContextInterface;
  additionalDecorators?: Array<
    (
      context: ContextInterface,
      options?: OptionsInterface,
    ) => ContextInterface | Promise<ContextInterface>
  >;
  options?: OptionsInterface;
}
