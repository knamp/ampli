import * as isAbsoluteUrl from "is-absolute-url";
import * as requestImageSize from "request-image-size";

import ContextInterface from "../interfaces/ContextInterface";
import ImageDimentionsInterface from "../interfaces/ImageDimentionsInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import { replaceElement } from ".";
import Logger from "../Logger";
import { createElement } from "../utils";

const setLayout = (element: HTMLElement): HTMLElement => {
  element.setAttribute("layout", "responsive");

  return element;
};

const setDimentions = async (
  element: HTMLElement,
  image: HTMLImageElement,
): Promise<HTMLElement | null> => {
  const src: string = image.src;
  let dimentions: ImageDimentionsInterface = {
    height: 0,
    width: 0,
  };

  if (process.env.DEBUG === "*") {
    Logger.info(`Trying to fetch image ${src}`);
  }

  if (!src.startsWith("data:") && isAbsoluteUrl(src)) {
    try {
      dimentions = await requestImageSize(image.src);

      element.setAttribute("width", `${dimentions.width}`);
      element.setAttribute("height", `${dimentions.height}`);

      return element;
    } catch (error) {
      Logger.error(`Cannot get file ${image.src}, removing element`, error);

      element.remove();
    }
  }

  return null;
};

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  return replaceElement(
    context,
    "img",
    "amp-img",
    async (
      element: HTMLElement,
      initialElement: HTMLElement,
    ): Promise<HTMLElement | null> => {
      const newElement = setLayout(element);

      return await setDimentions(newElement, initialElement as HTMLImageElement);
    },
  );
};
