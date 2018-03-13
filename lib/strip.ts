import ContextInterface from './interfaces/ContextInterface'

export default (
  context: ContextInterface,
  selector: string
): ContextInterface => {
  const elements: NodeListOf<HTMLElement> = context.document.querySelectorAll(selector)

  Array.from(elements).forEach((element: any) => {
    element.remove()
  })

  return context
}
