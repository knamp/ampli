import IDocument from './interfaces/IDocument'

export default (context: IDocument): IDocument => {
  context.document.documentElement.setAttribute('amp', '')

  return context
}
