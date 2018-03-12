import whitelist from '../whitelist'

export default (
  element: HTMLElement
) => {
  if (!element.tagName) {
    return
  }

  const tagName: string = element.tagName.toLowerCase()

  if (whitelist.indexOf(tagName) === -1) {
    element.remove()
  }
}
