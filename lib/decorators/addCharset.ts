import ContextInterface from "../interfaces/ContextInterface";

import strip from "../strip";
import { createElement } from "../utis/";

const addCharset = (element: HTMLElement): HTMLElement => {
  element.setAttribute("charset", "utf-8");

  return element;
};

export default async (
  context: ContextInterface,
): Promise<ContextInterface> => {
  const element = await createElement(context, "meta", addCharset);

  context = strip(context, "meta[charset]");

  context.document.head.appendChild(element);

  return context;
};
