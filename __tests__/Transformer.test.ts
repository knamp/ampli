import * as fs from "fs";
import * as path from "path";
import Transformer from "../lib/Transformer";

describe("Transformer", () => {
  const htmlPath: string = path.resolve(__dirname, "./mock/index.html");
  const html: string = fs.readFileSync(htmlPath).toString();

  it("initializes", async () => {
    const ampPath: string = path.resolve(__dirname, "./mock/index.amp.html");
    const ampExpected: string = fs.readFileSync(ampPath).toString();

    const transformer: Transformer = new Transformer();
    const amp: string = await transformer.transform(html, "http://canoni.cal/");

    expect(amp.trim()).toEqual(ampExpected.trim());
  });

  it("initializes with addtional decorators", async () => {
    const ampPath: string = path.resolve(__dirname, "./mock/additional.amp.html");
    const ampExpected: string = fs.readFileSync(ampPath).toString();

    const transformer: Transformer = new Transformer({}, [
      (context) => {
        context.document.documentElement.setAttribute("lang", "en");

        return context;
      },
    ]);
    const amp: string = await transformer.transform(html, "http://canoni.cal/");

    expect(amp.trim()).toEqual(ampExpected.trim());
  });

});
