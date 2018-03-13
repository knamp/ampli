import ContextInterface from '../interfaces/ContextInterface'

export default async (
  { document }: ContextInterface,
  elementName: string,
  transform: Function = element => element
): Promise<HTMLElement> => {
  const fragment = document.createDocumentFragment()
  let element = document.createElement(elementName)
  element = await transform(element)

  fragment.appendChild(element)

  return fragment
}
