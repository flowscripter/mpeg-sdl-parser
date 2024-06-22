import getLogger from "../../src/util/logger.ts";

Deno.test("Can acquire a logger", () => {
  const logger = getLogger("logger test 1");

  logger.debug("foobar");
});

Deno.test("Logging with args ", () => {
  const logger = getLogger("logger test 2");

  logger.debug("foobar with args: %s", 'yes');
});

Deno.test("Logging with different length logging names ", () => {
  const logger1 = getLogger("logger test 3 x");
  const logger2 = getLogger("logger test 3 xxx");

  logger1.debug("foobar");
  logger2.debug("foobar");
  logger1.debug("foobar with args: %s", 'yes');
  logger2.debug("foobar with args: %s", 'yes');
});

Deno.test("Logging at all levels ", () => {
  const logger = getLogger("logger test 4");

  logger.debug("foobar");
  logger.info("foobar");
  logger.warn("foobar");
  logger.error("foobar");
  logger.critical("foobar");
});
