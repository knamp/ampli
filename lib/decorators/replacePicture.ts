import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import { replaceElement } from ".";
import { addAllAttributes } from "../utils";

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  return replaceElement(
    context,
    "picture",
    "img",
    async (
      element: HTMLElement,
      initialElement: HTMLElement,
    ): Promise<HTMLElement> => {
      const img = initialElement.querySelector("img") as HTMLElement;

      return addAllAttributes(element, img);
    },
  );
};
