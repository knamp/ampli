import { minify } from "html-minifier";
import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

export default (
  html: string,
  options?: OptionsInterface,
): string => {
  return minify(html, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
  });
};
