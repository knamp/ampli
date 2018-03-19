import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import { replaceElement } from ".";
import Logger from "../Logger";
import { addAllAttributes, createElement } from "../utils";

const getImageElement = (context: ContextInterface) => {
  return async (
    element: HTMLElement,
    initialElement: HTMLElement,
  ): Promise<HTMLElement | null> => {
    const fallbackImage: HTMLElement | null = initialElement.querySelector("img");
    const sources: NodeList = initialElement.querySelectorAll("source");
    const sourcesArray = Array.from(sources);
    const matchedSources: Node[] = sourcesArray.filter(
      (sourcesElement: Node): boolean => (
        (sourcesElement as HTMLElement).getAttribute("type") === "image/type"
      ),
    );
    let matchedSource: HTMLElement;

    if (matchedSources.length === 0) {
      matchedSource = sources[0] as HTMLElement;
    } else {
      matchedSource = matchedSources[0] as HTMLElement;
    }

    return await createElement(
      context,
      "img",
      addAttributesToImage(matchedSource, fallbackImage),
    );
  };
};

const addAttributesToImage =
  (matchedSource: HTMLElement, fallbackImage: HTMLElement | null): (
    (element: HTMLElement) => HTMLElement
  ) => (element: HTMLElement): HTMLElement => {
  element = addAllAttributes(element, matchedSource);

  if (fallbackImage) {
    let fallbackImageSource: string | null = fallbackImage.getAttribute("src");

    if (!fallbackImageSource) {
      fallbackImageSource = "";
    }

    element.setAttribute("src", fallbackImageSource);
  } else {
    Logger.info(
      "No img-tag fallback for picture element with JPEG source",
      matchedSource.getAttribute("src"),
      matchedSource.getAttribute("srcset"),
    );
  }

  return element;
};

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => (
  replaceElement(
    context,
    "picture",
    "img",
    getImageElement(context),
  )
);
