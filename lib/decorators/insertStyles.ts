import ContextInterface from "../interfaces/ContextInterface";

import ConvertStyles from "../ConverStyles";
import strip from "../strip";
import { createElement } from "../utis/";

export default async (
  context: ContextInterface,
): Promise<ContextInterface> => {
  const styles: string = await new ConvertStyles(context).get();

  context = strip(context, "style, link");

  const element: HTMLElement = await createElement(context, "style", (element) => {
    element.setAttribute("amp-custom", "");
    element.innerHTML = styles;

    return element;
  });

  context.document.head.appendChild(element);

  return context;
};
