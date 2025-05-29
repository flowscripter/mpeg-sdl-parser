import * as prettier from "prettier";
import fs from "node:fs/promises";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import prettierPluginSdl from "../../src/prettier/prettierPluginSdl";
import { createStrictSdlParser } from "../../src/lezer/createSdlParser.ts";
import SdlStringInput from "../../src/lezer/SdlStringInput";

const strictSdlParser = await createStrictSdlParser();

describe("Prettier Plugin SDL tests", () => {
  test("prettified output is as expected", async () => {
    const sampleSdlSpecification = await fs.readFile(
      path.join(__dirname, "../sample_specifications/various_elements.sdl"),
    ).then((buffer) => buffer.toString());

    const options: prettier.Options = {
      parser: "sdl",
      plugins: [prettierPluginSdl],
    };

    const prettified = await prettier.format(sampleSdlSpecification, options);

    expect(prettified).toMatchSnapshot();
  });

  test("prettified output is valid", async () => {
    const sampleSdlSpecification = await fs.readFile(
      path.join(__dirname, "../sample_specifications/various_elements.sdl"),
    ).then((buffer) => buffer.toString());

    const options: prettier.Options = {
      parser: "sdl",
      plugins: [prettierPluginSdl],
    };

    const prettified = await prettier.format(sampleSdlSpecification, options);

    const sdlStringInput = new SdlStringInput(prettified);
    strictSdlParser.parse(sdlStringInput);
  });
});
