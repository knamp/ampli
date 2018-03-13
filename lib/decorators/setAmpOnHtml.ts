import ContextInterface from "../interfaces/ContextInterface";

export default (context: ContextInterface): ContextInterface => {
  context.document.documentElement.setAttribute("amp", "");

  return context;
};
