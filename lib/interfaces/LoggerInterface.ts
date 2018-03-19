export default interface LoggerInterface {
  info: (arg: any, ...arg2: any[]) => void;
  error: (arg: any, ...arg2: any[]) => void;
  warn: (arg: any, ...arg2: any[]) => void;
  debug: (arg: any, ...arg2: any[]) => void;
}
