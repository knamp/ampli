import * as isAbsoluteUrl from "is-absolute-url";
import * as requestImageSize from "request-image-size";

import ImageDimentionsInterface from "../interfaces/ImageDimentionsInterface";
import OptionsInterface from "../interfaces/OptionsInterface";
import Logger from "../Logger";

export default class ImageSetter {
  private returnElement: HTMLElement | null = null;

  constructor(
    private element: HTMLElement,
    private initialElement: HTMLElement,
    private options?: OptionsInterface,
  ) {}

  public async get(): Promise<HTMLElement | null> {
    this.setLayout();

    await this.setDimentions();

    return this.returnElement;
  }

  private setLayout() {
    const layout = this.element.getAttribute("layout");

    if (!layout) {
      this.element.setAttribute("layout", "responsive");
    }
  }

  private getSource(): string | null {
    let src: string = (this.initialElement as HTMLImageElement).src;

    if (src.startsWith("data:")) {
      return null;
    }

    if (!isAbsoluteUrl(src) && this.options && this.options.baseUrl) {
      src = `${this.options.baseUrl}${src}`;
    }

    return src;
  }

  private async setDimentions() {
    const src = this.getSource();

    if (!src) {
      this.returnElement = null;
    }

    let dimentions: ImageDimentionsInterface = {
      height: 0,
      width: 0,
    };

    if (process.env.DEBUG === "*") {
      Logger.info("Trying to fetch image", src);
    }

    try {
      dimentions = await requestImageSize(src);

      this.element.setAttribute("width", `${dimentions.width}`);
      this.element.setAttribute("height", `${dimentions.height}`);
      this.element.setAttribute("src", `${src}`);

      this.returnElement = this.element;

      return;
    } catch (error) {
      Logger.error(`Cannot get file ${src}, removing element`);

      this.element.remove();
    }

    this.returnElement = null;
  }
}
