import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import ConvertStyles from "../ConverStyles";
import strip from "../strip";
import { createElement } from "../utis/";

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  const styles: string = await new ConvertStyles(context, options).get();

  context = strip(context, "style, link");

  const element: HTMLElement = await createElement(
    context,
    "style",
    (elementToTransform: HTMLElement): HTMLElement => {
      elementToTransform.setAttribute("amp-custom", "");
      elementToTransform.innerHTML = styles;

      return elementToTransform;
    },
  );

  context.document.head.appendChild(element);

  return context;
};
