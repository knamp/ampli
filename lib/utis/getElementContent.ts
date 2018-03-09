import IDocument from '../interfaces/IDocument'

export default async ({ document }: IDocument, selector: string): Promise<string[]> => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(selector)
  const elementsArray: HTMLElement[] = Array.from(elements);

  return elementsArray.map((element: HTMLElement) => element.innerHTML)
}
