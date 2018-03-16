import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

export default (
  context: ContextInterface,
  options?: OptionsInterface,
): ContextInterface => {
  context.document.documentElement.setAttribute("amp", "");

  return context;
};
