import IDocument from './interfaces/IDocument'

const strip = async (context: IDocument, selector: string): Promise<IDocument> => {
  const elements = context.document.querySelectorAll(selector)

  Array.from(elements).forEach((element: any) => {
    element.remove()
  })

  return context
}

export default strip
