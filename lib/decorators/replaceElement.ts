import ContextInterface from "../interfaces/ContextInterface";
import {
  addAllAttributes,
  createElement,
} from "../utis";

export default async (
  context: ContextInterface,
  elementName: string,
  newElementName: string,
  getAddtionalAttributes?: Function,
): Promise<ContextInterface> => {
  const elements: NodeListOf<HTMLImageElement> =
    context.document.querySelectorAll(elementName);
  const elementsArray = Array.from(elements);

  for (const initialElement of elementsArray) {
    const element: HTMLElement = await createElement(
      context,
      newElementName,
      async (element) => {
        element = await addAllAttributes(element, initialElement);

        if (typeof getAddtionalAttributes === "function") {
          element = await getAddtionalAttributes(element, initialElement);
        }

        return element;
      },
    );

    if (initialElement.parentNode) {
      initialElement.parentNode.insertBefore(element, initialElement);
    }

    initialElement.remove();
  }

  return context;
};
