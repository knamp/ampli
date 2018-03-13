import ContextInterface from '../interfaces/ContextInterface'

import blacklistAttributes from '../blacklistAttributes'

export default (
  element: HTMLElement
) => {
  blacklistAttributes.forEach((item) => {
    const matches = element.matches(item.selector)

    if (matches) {
      item.attributes.forEach((attributeRegex) => {
        const attributes: NamedNodeMap = element.attributes

        Array.from(attributes).forEach((attribute) => {
          const matchesAttribute = attribute.nodeName.match(attributeRegex)

          if (matchesAttribute && matchesAttribute.length > 0) {
            element.removeAttribute(attribute.nodeName)
          }
        })
      })
    }
  })
}
