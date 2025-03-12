import { describe, test } from "bun:test";
import getLogger from "../../src/util/logger.ts";

describe("Logger Tests", () => {
  test("Can acquire a logger", () => {
    const logger = getLogger("logger test 1");

    logger.debug("foobar");
  });

  test("Logging with args ", () => {
    const logger = getLogger("logger test 2");

    logger.debug("foobar with args: %s", "yes");
  });

  test("Logging with different length logging names ", () => {
    const logger1 = getLogger("logger test 3 x");
    const logger2 = getLogger("logger test 3 xxx");

    logger1.debug("foobar");
    logger2.debug("foobar");
    logger1.debug("foobar with args: %s", "yes");
    logger2.debug("foobar with args: %s", "yes");
  });

  test("Logging at all levels ", () => {
    const logger = getLogger("logger test 4");

    logger.trace("foobar");
    logger.debug("foobar");
    logger.info("foobar");
    logger.warn("foobar");
    logger.error("foobar");
  });
});
