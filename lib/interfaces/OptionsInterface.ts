import AdditionalScriptsInterface from "./AdditionalScriptsInterface";
import LoggerInterface from "./LoggerInterface";

export default interface OptionsInterface {
  logger?: LoggerInterface;
  useStaticCss?: boolean;
  additionalTags?: string[];
  additionalScripts?: AdditionalScriptsInterface[];
  blacklistAttributes?: Array<{
    attributes: string[];
    selector: string;
  }>;
  baseUrl?: string;
  hooks?: {
    styles?: {
      parseRule?: (rule: any) => any
    }
  };
}
