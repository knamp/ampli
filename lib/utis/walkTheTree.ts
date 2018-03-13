const walkTheTree = (parent: Node, callback: Function) => {
  const children = filterChildren(parent, callback);

  children.forEach((child) => walkTheTree(child, callback));
};

const filterChildren = (parent: Node, callback: Function): Node[] => {
  const childNodes = parent.childNodes;
  const children = Array.from(childNodes);

  if (childNodes === null) {
    return children;
  }

  children.forEach((child: Node) =>  {
    const childElement = child as any as HTMLElement;

    if (!childElement.tagName) {
      return;
    }

    callback(childElement);
  });

  return children;
};

export default walkTheTree;
