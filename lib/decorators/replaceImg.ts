import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import { replaceElement } from ".";
import ImageSetter from "../workers/ImageSetter";

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
      const imageSetter: ImageSetter = new ImageSetter(element, initialElement, options);
      const image: HTMLElement | null = await imageSetter.get();

      return image;
    },
  );
};
