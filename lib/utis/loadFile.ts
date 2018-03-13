import * as isAbsoluteUrl from "is-absolute-url";
import * as request from "request-promise-native";

import Logger from "../Logger";

export default async (href: string): Promise<string> => {
  Logger.info(`Trying to fetch image ${href}`);

  if (!href.startsWith("data:") && isAbsoluteUrl(href)) {
    try {
      const response = await request(href);

      return response.toString();
    } catch (err) {
      Logger.error(err);
    }
  }

  return Promise.resolve("");
};
