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
  const promises: Array<Promise<HTMLElement | null>> = [];

  for (const initialElement of elementsArray) {
    promises.push(
      createElement(
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
      ),
    );
  }

  await Promise.all(promises)
    .then((loadElements) => {
      for (let i = 0; i < elementsArray.length; i++) {
        const initialElement = elementsArray[i];
        const element = loadElements[i] as HTMLElement;

        if (initialElement.parentNode) {
          initialElement.parentNode.insertBefore(element, initialElement);
        }

        initialElement.remove();
      }
    });

  return context;
};
