import {
  addAmpBoilerplate,
  addAmpScript,
  addCharset,
  addViewport,
  insertStyles,
  keepWhitelistedTags,
  removeBlacklistedAttributes,
  replaceElement,
  replaceImg,
  replacePicture,
  setAmpOnHtml,
} from "./decorators";

import ContextInterface from "./interfaces/ContextInterface";
import OptionsInterface from "./interfaces/OptionsInterface";
import TransformerInterface from "./interfaces/TransformerInterface";

import convertToDom from "./convertToDom";
import { set as setLogger } from "./Logger";
import strip from "./strip";
import { walkTheTree } from "./utis";

export default class Transformer implements TransformerInterface {
  public html = "";
  public context = {
    document: null,
    jsdom: null,
    window: null,
  };

  constructor(
    public options?: OptionsInterface,
    public additionalDecorators?: Array<
      (
        context: ContextInterface,
        options?: OptionsInterface,
      ) => ContextInterface
    >,
  ) {
    if (options && options.logger) {
      setLogger(options.logger);
    }
  }

  public async transform(
    html: string,
  ): Promise<string> {
    this.html = html;

    this.context = await convertToDom(html);

    return await this.transformDocumentToAmp();
  }

  private async transformDocumentToAmp(): Promise<string> {
    let context: ContextInterface = this.context;

    // Order matters
    const decorators: Array<
      (
        context: ContextInterface,
        options?: OptionsInterface,
      ) => ContextInterface | Promise<ContextInterface>
    > = [

      // Set AMP attribute on HTML element
      setAmpOnHtml,

      // Strip scripts
      (): ContextInterface => strip(context, "script"),

      // Set charset
      addCharset,

      // Add Viewport
      addViewport,

      // Replace <picture> with <img>
      replacePicture,

      // Replace <img> with <amp-img>, set width and height for images
      replaceImg,

      // Replace <iframe> with <amp-iframe>
      (): Promise<ContextInterface> => (
        replaceElement(context, "iframe", "amp-iframe")
      ),

      // Keep only whitelisted tags and remove blacklisted attributes
      (): ContextInterface => {
        walkTheTree(context.document, (element: HTMLElement) => {
          keepWhitelistedTags(element);
          removeBlacklistedAttributes(element);
        });

        return context;
      },

      // @TODO Include canonical link
    ];

    const decorateAtTheEnd: Array<
      (
        context: ContextInterface,
        options?: OptionsInterface,
      ) => ContextInterface | Promise<ContextInterface>
    > = [

      // Replace external stylesheets, replace inline styles
      insertStyles,

      // Add AMP Boilerplate
      addAmpBoilerplate,

      // Add AMP script
      addAmpScript,
    ];

    // Apply decorators
    for (const decorator of decorators) {
      context = await decorator(context, this.options);
    }

    // Additional decorators
    if (this.additionalDecorators && this.additionalDecorators.constructor === Array) {
      for (const decorator of this.additionalDecorators) {
        context = await decorator(context, this.options);
      }
    }

    // Apply decorators that should be done as last action
    for (const decorator of decorateAtTheEnd) {
      context = await decorator(context, this.options);
    }

    // Export full HTML
    return context.jsdom.serialize();
  }
}
