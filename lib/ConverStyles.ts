import * as CleanCSS from "clean-css";
import * as Css from "css";
import StaticStyles, { Output as StaticStylesOutput } from "static-styles";

import ContextInterface from "./interfaces/ContextInterface";
import OptionsInterface from "./interfaces/OptionsInterface";

import Logger from "./Logger";
import {
  getElementContent,
  loadFile,
} from "./utils/";

export default class ConvertStyles {
  private cleanCss: CleanCSS;

  constructor(
    private context: ContextInterface,
    private options?: OptionsInterface,
  ) {
    this.cleanCss = new CleanCSS({
      level: 1,
    });
  }

  public async get(): Promise<string> {
    const styles: string = await this.getInlineStyles();
    const filteredStyles: string = this.filterStyles(styles);
    let compiledStyles: string = filteredStyles;

    if (this.options && this.options.useStaticCss) {
      const html: string = this.context.jsdom.serialize();
      const stylesInUse: StaticStylesOutput = StaticStyles(html, filteredStyles);
      compiledStyles = stylesInUse.css;

      Logger.info("Cleaned styles from unused", stylesInUse.stats);
    }

    const minifiedStyles = this.cleanCss.minify(compiledStyles);

    Logger.info("Minified styles", minifiedStyles.stats);

    return minifiedStyles.styles;
  }

  private getInlineStyles = async () => {
    const stylesheetContent: string[] = await this.getStylesheets();
    const styleElementContent: string[] = await getElementContent(this.context, "style");

    return stylesheetContent.concat(styleElementContent).join(" ");
  }

  private getStylesheets = async (): Promise<string[]> => {
    const { document } = this.context;
    const stylesheetElements: NodeListOf<HTMLElement> =
      document.querySelectorAll('link[rel="stylesheet"]');
    const stylesheets: HTMLElement[] = Array.from(stylesheetElements);
    const promises: Array<Promise<string>> = stylesheets
      .map((stylesheet: HTMLElement) => {
        const href: string | null = stylesheet.getAttribute("href");

        if (!href) {
          return Promise.resolve("");
        }

        return loadFile(href);
      });

    try {
      return await Promise.all(promises);
    } catch (err) {
      Logger.error(err);
    }

    return [];
  }

  private filterRules = (rules: any[]): any[] => {
    return rules.map((rule) => {

      // Remove @page, remove @media print
      if (
        ["page", "charset", "document"].indexOf(rule.type) > -1 ||
        ["print"].indexOf(rule.media) > -1
      ) {
        rule.delete = true;

        return rule;
      }

      if (rule.rules) {
        rule.rules = this.filterRules(rule.rules);

        return rule;
      }

      if (rule.declarations) {
        rule.declarations = rule.declarations.map((declaration) => {
          if (declaration.value && declaration.value.indexOf("!important") > -1) {
            declaration.value = declaration.value.replace("!important", "");
          }

          return declaration;
        });
      }

      return rule;
    }).filter((item) => item.delete !== true);
  }

  private filterStyles(styles: string): string {
    const ast = Css.parse(styles);

    ast.stylesheet.rules = this.filterRules(ast.stylesheet.rules);

    return Css.stringify(ast);
  }
}
