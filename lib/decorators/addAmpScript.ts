import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import packageConfig from "../../config";
import { createElement } from "../utis/";

const addScript = (element: HTMLElement): HTMLElement => {
  element.setAttribute("async", "");
  element.setAttribute("src", packageConfig.ampScript);

  return element;
};

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  const element = await createElement(context, "script", addScript);

  context.document.head.appendChild(element);

  return context;
};
