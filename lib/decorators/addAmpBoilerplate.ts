import * as fs from "fs";
import * as path from "path";
import ContextInterface from "../interfaces/ContextInterface";
import OptionsInterface from "../interfaces/OptionsInterface";

export default (
  context: ContextInterface,
  options?: OptionsInterface,
): ContextInterface => {
  const boilerplatePath: string = path.resolve(__dirname, "../boilerplate", "boilerplate.html");
  const boilerplate: Buffer = fs.readFileSync(boilerplatePath);

  context.document.head.innerHTML += boilerplate.toString();

  return context;
};
