import ContextInterface from "../interfaces/ContextInterface";

export default async ({ document }: ContextInterface, selector: string): Promise<string[]> => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  const elementsArray: HTMLElement[] = Array.from(elements);

  return elementsArray.map((element: HTMLElement) => element.innerHTML);
};
