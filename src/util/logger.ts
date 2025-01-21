import { log, sprintf } from "../../deps.ts";
import { getEnvVarIfPermitted } from "./envVarHelper.ts";

let defaultLogger: log.Logger | undefined;

if (defaultLogger === undefined) {
  defaultLogger = await setupLogger();
}

const LEVEL_PADDINGS: Record<string, string> = {
  DEBUG: "    ",
  INFO: "     ",
  WARN: "     ",
  ERROR: "    ",
  CRITICAL: " ",
};

let maxLoggerNameLength = 0;

const LOGGER_NAME_PADDINGS: Record<string, string> = {};

async function setupLogger() {
  log.setup({
    handlers: {
      console: new log.ConsoleHandler(
        (await getEnvVarIfPermitted("MPEG_SDL_PARSER_DEBUG") !== undefined)
          ? "DEBUG"
          : "ERROR",
        {
          formatter: (logRecord) => {
            const { msg, args, levelName, loggerName } = logRecord;

            if (args.length === 0) {
              return `${levelName}${LEVEL_PADDINGS[levelName]} [${loggerName}]${
                LOGGER_NAME_PADDINGS[loggerName]
              } ${msg}`;
            }
            return `${levelName}${LEVEL_PADDINGS[levelName]} [${loggerName}]${
              LOGGER_NAME_PADDINGS[loggerName]
            } ${sprintf(msg, ...args)}`;
          },
        },
      ),
    },

    loggers: {
      default: {
        handlers: ["console"],
      },
    },
  });

  return log.getLogger();
}

/**
 * Retrieves a logger instance with the specified name. If the name length exceeds the current maximum logger name length,
 * it updates the padding for all existing logger names to ensure consistent formatting.
 *
 * @param name - The name of the logger to retrieve.
 * @returns A logger instance with the specified name.
 */
export default function getLogger(name: string): log.Logger {
  if (name.length > maxLoggerNameLength) {
    maxLoggerNameLength = name.length;

    for (const key of Object.keys(LOGGER_NAME_PADDINGS)) {
      LOGGER_NAME_PADDINGS[key] = " ".repeat(maxLoggerNameLength - key.length);
    }

    LOGGER_NAME_PADDINGS[name] = "";
  } else if (LOGGER_NAME_PADDINGS[name] === undefined) {
    LOGGER_NAME_PADDINGS[name] = " ".repeat(maxLoggerNameLength - name.length);
  }

  const logger = log.getLogger(name);
  logger.level = log.LogLevels.DEBUG;
  logger.handlers.push(...log.getLogger().handlers);

  return logger;
}
