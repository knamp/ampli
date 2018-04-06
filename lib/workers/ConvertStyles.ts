import * as CleanCSS from "clean-css";
import * as Css from "css";
import * as path from "path";
import StaticStyles, { Output as StaticStylesOutput } from "static-styles";
import * as url from "url";

import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";
import StylesheetResponseInterface from "../interfaces/StylesheetResponseInterface";

import Logger from "../Logger";
import {
  getElementContent,
  loadFile,
} from "../utils/";

export default class ConvertStyles {
  private cleanCss: CleanCSS;

  constructor(
    private context: ContextInterface,
    private options?: OptionsInterface,
  ) {
    this.cleanCss = new CleanCSS({
      inline: ["remote"],
      level: {
        1: {
          all: true,
          roundingPrecision: "all=3",
        },
        2: {
          all: true,
          mergeAdjacentRules: false,
          mergeNonAdjacentRules: false,
          reduceNonAdjacentRules: false,
        },
      },
    });

    this.transformResponse = this.transformResponse.bind(this);
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
    const responses: Array<StylesheetResponseInterface | null> =
      await this.getStylesheets();
    const transformedResponses: string[] = this.transformResponses(responses);
    const styleElementContent: string[] = await getElementContent(this.context, "style");

    return transformedResponses.concat(styleElementContent).join(" ");
  }

  private getStylesheets = async (): Promise<
    Array<StylesheetResponseInterface | null>
  > => {
    const { document } = this.context;
    const stylesheetElements: NodeListOf<HTMLElement> =
      document.querySelectorAll('link[rel="stylesheet"]');
    const stylesheets: HTMLElement[] = Array.from(stylesheetElements);
    const promises: Array< Promise<StylesheetResponseInterface | null> > =
      stylesheets.map(this.getSingleStylesheet);

    try {
      return await Promise.all(promises);
    } catch (err) {
      Logger.error(err);
    }

    return [];
  }

  private async getSingleStylesheet(stylesheet: HTMLElement): Promise<
    StylesheetResponseInterface | null
  > {
    const href: string | null = stylesheet.getAttribute("href");

    if (!href) {
      return null;
    }

    const response: string = await loadFile(href);

    return {
      response,
      src: href,
    };
  }

  private transformResponses(responses: Array<StylesheetResponseInterface | null>): string[] {
    return responses.map(this.transformResponse);
  }

  private transformResponse(response: StylesheetResponseInterface | null): string {
    if (response === null) {
      return "";
    }

    const baseDir: string = this.getDirFromFileUrl(response.src);

    const transformedResponse: string = response.response.replace(
      /url\(\"?(.*?)\"?\)/g,
      (match: string, matchedUrl: string): string => (
        `url(${url.resolve(baseDir, matchedUrl)})`
      ),
    );

    return transformedResponse;
  }

  private getDirFromFileUrl(fileurl: string): string {
    return `${path.dirname(fileurl)}/`;
  }

  private isBiggerThan(rule: string, sizeToMatch: number): boolean {
    const ruleSettings: string[] = rule.replace(
      /.*?(max|min)-width:\s?(\d*)(em|rem|%|px|ch|ex|vw|vh|vmin|vmax)\)?\;?/g,
      (match: string, minMax: string, size: string, unit: string) => {
        return `${minMax} ${size} ${unit}`;
      }
    ).split(" ");

    let sizeInPx: number = parseInt(ruleSettings[1], 10);

    if (ruleSettings[2] === "em" || ruleSettings[2] === "rem") {
      sizeInPx = sizeInPx * 16;
    }

    if (ruleSettings[0] === "min" && sizeInPx > sizeToMatch) {
      return true;
    }

    return false;
  }

  private filterRules(rules: any[]): any[] {
    return rules.map((rule) => {

      // Remove @page, remove @media print
      if (
        ["page", "charset", "document"].indexOf(rule.type) > -1 ||
        ["print"].indexOf(rule.media) > -1
      ) {
        rule.delete = true;
        return rule;
      }

      // Media Queries for large screens if option is enabled
      if (this.options && this.options.removeLargeScreenMediaqueries &&
        rule.type === "media" && this.isBiggerThan(rule.media, 1024)
      ) {
        rule.delete = true;
        return rule;
      }

      if (rule.rules) {
        rule.rules = this.filterRules(rule.rules);

        return rule;
      }

      // Call hook if it exisits
      if (
        this.options && this.options.hooks && this.options.hooks.styles &&
        typeof this.options.hooks.styles.parseRule === "function"
      ) {
        rule = this.options.hooks.styles.parseRule(rule);
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
