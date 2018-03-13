import { replaceElement } from ".";
import ContextInterface from "../interfaces/ContextInterface";
import { addAllAttributes } from "../utis";

export default async (
  context: ContextInterface,
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
