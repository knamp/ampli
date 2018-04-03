export default (
  element: HTMLElement,
  initialElement: HTMLElement,
): HTMLElement => {
  const attributes: NamedNodeMap = initialElement.attributes;

  Array.from(attributes).forEach((attribute) => {
    if (element && element.setAttribute) {
      element.setAttribute(attribute.nodeName, attribute.nodeValue || "");
    }
  });

  return element;
};
