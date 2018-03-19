import ContextInterface from "../interfaces/ContextInterface";

export default async (
  { document }: ContextInterface,
  elementName: string,
  transform: (element: HTMLElement) => Promise<HTMLElement | null> | HTMLElement =
    (elementToTransform: HTMLElement): HTMLElement => elementToTransform,
): Promise<HTMLElement> => {
  const fragment = document.createDocumentFragment();
  let element = document.createElement(elementName);
  element = await transform(element);

  if (element) {
    fragment.appendChild(element);
  }

  return fragment;
};
