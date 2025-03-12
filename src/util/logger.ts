import process from "node:process";
type LoggerFunction = (
  message: object | (() => string) | string,
  ...optionalParams: unknown[]
) => void;

export interface Logger {
  trace: LoggerFunction;
  debug: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}

const debugEnabled = process.env["CLI_DEBUG"] !== undefined;

function getDefaultLogger(): Logger {
  if (debugEnabled) {
    return {
      trace: () => {},
      debug: (message, ...optionalParams) => {
        console.debug(message, optionalParams);
      },
      info: (message, ...optionalParams) => {
        console.info(message, optionalParams);
      },
      warn: (message, ...optionalParams) => {
        console.warn(message, optionalParams);
      },
      error: (message, ...optionalParams) => {
        console.error(message, optionalParams);
      },
    };
  }
  return {
    trace: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: (message, ...optionalParams) => {
      console.error(message, optionalParams);
    },
  };
}

function wrapWithLoggerName(
  loggerName: string,
  loggerFunction: LoggerFunction,
): LoggerFunction {
  return (message, ...optionalParams) => {
    if (message instanceof Object) {
      message.loggerName = loggerName;
      loggerFunction(message, optionalParams);
      return;
    }
    if (message instanceof Function) {
      loggerFunction(`${loggerName} ${message()}`, optionalParams);
      return;
    }
    loggerFunction(`${loggerName} ${message}`, optionalParams);
  };
}

export default function getLogger(loggerName: string): Logger {
  if (globalThis.defaultLogger === undefined) {
    globalThis.defaultLogger = getDefaultLogger();
  }
  if (debugEnabled) {
    return {
      trace: () => {},
      debug: wrapWithLoggerName(loggerName, globalThis.defaultLogger.debug),
      info: wrapWithLoggerName(loggerName, globalThis.defaultLogger.info),
      warn: wrapWithLoggerName(loggerName, globalThis.defaultLogger.warn),
      error: wrapWithLoggerName(loggerName, globalThis.defaultLogger.error),
    };
  }
  return {
    trace: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: wrapWithLoggerName(loggerName, globalThis.defaultLogger.error),
  };
}
