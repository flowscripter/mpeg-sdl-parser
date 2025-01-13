import PrettyPrinter from "../../../src/abstract_syntax_tree/visitor/PrettyPrinter.ts";
import Parser from "../../../src/parser/Parser.ts";
import { assertEquals, assertNotEquals, path } from "../../test_deps.ts";

// TODO: fix this
Deno.test("Test pretty printer node visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const prettyPrinter = new PrettyPrinter();
  const prettifiedSampleSdlSpecification = prettyPrinter.getSpecificationString(
    parsedSpecification,
  );

  assertNotEquals(
    prettifiedSampleSdlSpecification,
    originalSampleSdlSpecification,
  );

  assertEquals(
    prettifiedSampleSdlSpecification,
    originalSampleSdlSpecification,
  );
});
