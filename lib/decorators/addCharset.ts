import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import strip from "../strip";
import { createElement } from "../utils/";

const addCharset = (element: HTMLElement): HTMLElement => {
  element.setAttribute("charset", "utf-8");

  return element;
};

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  const element = await createElement(context, "meta", addCharset);

  context = strip(context, "meta[charset]");

  context.document.head.appendChild(element);

  return context;
};
