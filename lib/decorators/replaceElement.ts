import ContextInterface from "../interfaces/ContextInterface";
import {
  addAllAttributes,
  createElement,
} from "../utils";

export default async (
  context: ContextInterface,
  elementName: string,
  newElementName: string,
  getAddtionalAttributes?: (element: HTMLElement, initialElement: HTMLElement) => Promise<HTMLElement | null>,
): Promise<ContextInterface> => {
  const elements: NodeListOf<HTMLImageElement> =
    context.document.querySelectorAll(elementName);
  const elementsArray = Array.from(elements);

  for (const initialElement of elementsArray) {
    const element: HTMLElement = await createElement(
      context,
      newElementName,
      async (elementToTransform: HTMLElement): Promise<HTMLElement | null> => {
        let newElement: HTMLElement | null =
          await addAllAttributes(elementToTransform, initialElement);

        if (typeof getAddtionalAttributes === "function") {
          newElement = await getAddtionalAttributes(elementToTransform, initialElement);
        }

        return newElement;
      },
    );

    if (initialElement.parentNode) {
      initialElement.parentNode.insertBefore(element, initialElement);
    }

    initialElement.remove();
  }

  return context;
};
