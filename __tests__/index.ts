import * as fs from "fs";
import * as Log from "log";
import * as path from "path";
import Ampli, { ContextInterface } from "../";

const inputArguments: string[] = process.argv.slice(2);

if (!inputArguments[0]) {
  throw new Error("No file provided");
}

const file: string = inputArguments[0];
const filePath: string = path.resolve(__dirname, "../../__tests__/data/", file);
const outputPath: string = path.resolve(__dirname, `amp-${file}`);
const log = new Log("info");

fs.readFile(filePath, async (err, content: Buffer): Promise<string> => {
  if (err) {
    throw new Error(err.message);
  }

  const html = content.toString();
  const ampli: Ampli = new Ampli({
    baseUrl: "https://drublic.de/",
    removeLargeScreenMediaqueries: true,
  });
  const amp: string = await ampli.transform(html, "https://drublic.de/");

  fs.writeFileSync(outputPath, amp);
  log.info(`Generated File: ${outputPath}`);

  return amp;
});
