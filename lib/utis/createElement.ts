import IDocument from '../interfaces/IDocument'

export default (
  { document }: IDocument,
  elementName: string,
  transform: Function = element => element
): HTMLElement => {
  const fragment = document.createDocumentFragment()
  let element = document.createElement(elementName)
  element = transform(element)

  fragment.appendChild(element)

  return fragment
}
