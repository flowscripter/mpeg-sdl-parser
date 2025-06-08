import { describe, test } from "bun:test";
import {
  createLenientSdlParser,
  createStrictSdlParser,
} from "../../src/lezer/createSdlParser.ts";

describe("createSdlParser Tests", () => {
  test("Test lenient SDL parser creation", () => {
    createLenientSdlParser();
  });

  test("Test strict SDL parser creation", () => {
    createStrictSdlParser();
  });
});
