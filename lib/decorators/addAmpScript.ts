import AdditionalScriptsInterface from "../interfaces/AdditionalScriptsInterface";
import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

import packageConfig from "../../config";
import { createElement } from "../utils/";

const addScript = (element: HTMLElement): HTMLElement => {
  element.setAttribute("async", "");
  element.setAttribute("src", packageConfig.ampScript);

  return element;
};

const addAdditonalScript = (
  script: AdditionalScriptsInterface,
  element: HTMLElement,
): HTMLElement => {
  element.setAttribute("async", "true");
  element.setAttribute("custom-element", script.element);
  element.setAttribute("src", script.src);

  return element;
};

export default async (
  context: ContextInterface,
  options?: OptionsInterface,
): Promise<ContextInterface> => {
  const element = await createElement(context, "script", addScript);
  context.document.head.appendChild(element);

  if (options && options.additionalScripts) {
    options.additionalScripts
      .forEach(async (script: AdditionalScriptsInterface) => {
        createElement(
          context,
          "script",
          addAdditonalScript.bind(null, script),
        ).then((scriptElement) => {
          context.document.head.appendChild(scriptElement);
        });
      });
  }

  return context;
};
