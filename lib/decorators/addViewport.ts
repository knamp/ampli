import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import strip from "../strip";
import { createElement } from "../utils/";

const addViewport = (element: HTMLElement): HTMLElement => {
  element.setAttribute("name", "viewport");
  element.setAttribute("content", "width=device-width, minimum-scale=1, initial-scale=1");

  return element;
};

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  const element = await createElement(context, "meta", addViewport);

  context = strip(context, 'meta[name="viewport"]');

  context.document.head.appendChild(element);

  return context;
};
