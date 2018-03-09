import IDocument from '../interfaces/IDocument'
import whitelist from '../whitelist'

const treeIterate = (parent: Node) => {
  const children = filterChildren(parent)

  children.forEach(treeIterate)
};

const filterChildren = (parent: Node): Node[] => {
  const childNodes = parent.childNodes
  const children = Array.from(childNodes)

  if (childNodes === null) {
    return children
  }

  children.forEach((child: Node) => {
    const childElement = <HTMLElement><any> child

    if (!childElement.tagName) {
      return
    }

    const tagName: string = childElement.tagName.toLowerCase()

    if (whitelist.indexOf(tagName) === -1) {
      childElement.remove()
    }
  })

  return children
}

export default (
  context: IDocument
): IDocument => {
  treeIterate(context.document)

  return context
}
