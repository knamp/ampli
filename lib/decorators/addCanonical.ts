import * as fs from "fs";
import * as path from "path";
import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";
import { createElement } from "../utils/";

export default async (
  canonical: string,
  context: ContextInterface,
): Promise<ContextInterface> => {
  const canonicalElement = await createElement(
    context,
    "link",
    (element: HTMLElement): HTMLElement => {
      element.setAttribute("rel", "canonical");
      element.setAttribute("href", canonical);

      return element;
    },
  );

  context.document.head.appendChild(canonicalElement);

  return context;
};
