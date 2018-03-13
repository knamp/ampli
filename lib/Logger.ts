import * as Log from "log";

import LoggerInterface from "./interfaces/LoggerInterface";

class Logger {
  private logger: LoggerInterface = new Log("info");

  public set(loggerInstance: LoggerInterface) {
    this.logger = loggerInstance;
  }

  public get() {
    return this.logger;
  }

}

const logger: Logger = new Logger();

export const set: (logger: LoggerInterface) => void = logger.set;
export default logger.get();
