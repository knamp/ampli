import OptionsInterface from "../interfaces/OptionsInterface";
import whitelist from "../whitelist";

export default (
  element: HTMLElement,
  options?: OptionsInterface,
) => {
  if (!element.tagName) {
    return;
  }

  const tagName: string = element.tagName.toLowerCase();

  if (whitelist.indexOf(tagName) === -1 &&
    (!options || !options.additionalTags || options.additionalTags.indexOf(tagName) === -1)
  ) {
    element.remove();
  }
};
