import * as isAbsoluteUrl from "is-absolute-url";
import * as requestImageSize from "request-image-size";

import { replaceElement } from ".";
import ContextInterface from "../interfaces/ContextInterface";
import ImageDimentionsInterface from "../interfaces/ImageDimentionsInterface";
import Logger from "../Logger";
import { createElement } from "../utis";

const setLayout = (element: HTMLElement): HTMLElement => {
  element.setAttribute("layout", "responsive");

  return element;
};

const setDimentions = async (
  element: HTMLElement,
  image: HTMLImageElement,
): Promise<HTMLElement> => {
  const src: string = image.src;
  let dimentions: ImageDimentionsInterface = {
    height: 0,
    width: 0,
  };

  Logger.info(`Trying to fetch image ${src}`);

  if (!src.startsWith("data:") && isAbsoluteUrl(src)) {
    try {
      dimentions = await requestImageSize(image.src);
    } catch (error) {
      Logger.error(`Cannot get file ${image.src}`, error);
    }
  }

  element.setAttribute("width", `${dimentions.width}`);
  element.setAttribute("height", `${dimentions.height}`);
  element.setAttribute("layout", "responsive");

  return element;
};

export default async (
  context: ContextInterface,
): Promise<ContextInterface> => {
  return replaceElement(
    context,
    "img",
    "amp-img",
    async (
      element: HTMLElement,
      initialElement: HTMLElement,
    ): Promise<HTMLElement> => {
      element = setLayout(element);
      element = await setDimentions(element, initialElement as HTMLImageElement);

      return element;
    },
  );
};
