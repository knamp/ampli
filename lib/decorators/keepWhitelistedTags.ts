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
  const additionalTags: string[] = options && options.additionalTags || [];

  if (
    whitelist.indexOf(tagName) === -1 &&
    additionalTags.indexOf(tagName) === -1
  ) {
    element.remove();
  }
};
