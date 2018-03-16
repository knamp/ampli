import ContextInterface from "../interfaces/ContextInterface";
import {
  addAllAttributes,
  createElement,
} from "../utils";

export default async (
  context: ContextInterface,
  elementName: string,
  newElementName: string,
  getAddtionalAttributes?: (element: HTMLElement, initialElement: HTMLElement) => Promise<HTMLElement>,
): Promise<ContextInterface> => {
  const elements: NodeListOf<HTMLImageElement> =
    context.document.querySelectorAll(elementName);
  const elementsArray = Array.from(elements);

  for (const initialElement of elementsArray) {
    const element: HTMLElement = await createElement(
      context,
      newElementName,
      async (elementToTransform: HTMLElement) => {
        elementToTransform = await addAllAttributes(elementToTransform, initialElement);

        if (typeof getAddtionalAttributes === "function") {
          elementToTransform = await getAddtionalAttributes(elementToTransform, initialElement);
        }

        return elementToTransform;
      },
    );

    if (initialElement.parentNode) {
      initialElement.parentNode.insertBefore(element, initialElement);
    }

    initialElement.remove();
  }

  return context;
};
