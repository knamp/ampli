import IDocument from './interfaces/IDocument'

export default (
  context: IDocument,
  selector: string
): IDocument => {
  const elements: NodeListOf<HTMLElement> = context.document.querySelectorAll(selector)

  Array.from(elements).forEach((element: any) => {
    element.remove()
  })

  return context
}
