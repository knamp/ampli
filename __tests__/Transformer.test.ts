import * as fs from "fs";
import * as path from "path";
import Transformer from "../lib/Transformer";

describe("Transformer", () => {
  it("initializes", async () => {
    const htmlPath: string = path.resolve(__dirname, "./mock/index.html");
    const ampPath: string = path.resolve(__dirname, "./mock/index.amp.html");
    const html: string = fs.readFileSync(htmlPath).toString();
    const transformer: Transformer = new Transformer();
    const amp: string = await transformer.transform(html, "http://canoni.cal/");

    const ampExpected: string = fs.readFileSync(ampPath).toString();

    expect(amp.trim()).toEqual(ampExpected.trim());
  });

});
