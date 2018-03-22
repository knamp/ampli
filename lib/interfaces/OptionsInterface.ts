import LoggerInterface from "./LoggerInterface";

export default interface OptionsInterface {
  logger?: LoggerInterface;
  useStaticCss?: boolean;
  additionalTags?: string[];
  baseUrl?: string;
}
