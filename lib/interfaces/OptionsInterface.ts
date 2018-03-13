interface LoggerInterface {
  info: () => void;
  error: () => void;
  debug: () => void;
}

export default interface OptionsInterface {
  logger?: LoggerInterface;
  useStaticCss?: boolean;
  additionalTags?: string[];
}
