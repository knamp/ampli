import IDocument from '../interfaces/IDocument'

export default async (
  { document }: IDocument,
  elementName: string,
  transform: Function = element => element
): Promise<HTMLElement> => {
  const fragment = document.createDocumentFragment()
  let element = document.createElement(elementName)
  element = await transform(element)

  fragment.appendChild(element)

  return fragment
}
