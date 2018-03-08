import IDocument from './interfaces/IDocument'

export default async (
  context: IDocument,
  selector: string
): Promise<IDocument> => {
  const elements = context.document.querySelectorAll(selector)

  Array.from(elements).forEach((element: any) => {
    element.remove()
  })

  return context
}
