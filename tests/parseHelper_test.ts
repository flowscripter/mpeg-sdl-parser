import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import HistoryRecordingNodeHandler, {
  expectedHistory,
} from "./fixtures/HistoryRecordingNodeHandler.ts";
import { buildAst } from "../src/ast/buildAst.ts";
import { createStrictSdlParser } from "../src/lezer/createSdlParser.ts";
import {
  collateParseErrors,
  dispatchHandler,
  prettyPrint,
} from "../src/parseHelper.ts";
import type { ParseError } from "../src/ParseError.ts";
import SdlStringInput from "../src/lezer/SdlStringInput.ts";

const sdlParser = await createStrictSdlParser();

describe("Parse Helper Tests", () => {
  test("Test collateParseErrors", async () => {
    const sdlString = await fs.readFile(
      path.join(__dirname, "../../sample_specifications/invalid.sdl"),
    ).then((buffer) => buffer.toString());

    const sdlStringInput = new SdlStringInput(sdlString);
    const parseTree = sdlParser.parse(sdlStringInput);
    const parseErrors = collateParseErrors(parseTree, sdlStringInput);

    const expectedParseErrors: ParseError[] = [];
    expect(
      parseErrors,
    ).toEqual(
      expectedParseErrors,
    );
  });

  test("Test prettyPrint", async () => {
    const sdlString = await fs.readFile(
      path.join(__dirname, "../../sample_specifications/various_elements.sdl"),
    ).then((buffer) => buffer.toString());
    const expectedSdlString = await fs.readFile(
      path.join(
        __dirname,
        "../../sample_specifications/prettified_various_elements.sdl",
      ),
    ).then((buffer) => buffer.toString());

    const sdlStringInput = new SdlStringInput(sdlString);
    const parseTree = sdlParser.parse(sdlStringInput);
    const specification = buildAst(parseTree, sdlStringInput);

    const prettifiedSdlString = await prettyPrint(specification);

    expect(
      prettifiedSdlString,
    ).toEqual(
      expectedSdlString,
    );
  });

  test("Test dispatchHandler", async () => {
    const sdlString = await fs.readFile(
      path.join(__dirname, "../../sample_specifications/sample.sdl"),
    ).then((buffer) => buffer.toString());

    const sdlStringInput = new SdlStringInput(sdlString);
    const parseTree = sdlParser.parse(sdlStringInput);
    const specification = buildAst(parseTree, sdlStringInput);

    const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();

    dispatchHandler(specification, historyRecordingNodeHandler);

    expect(
      historyRecordingNodeHandler.nodeHistory,
    ).toEqual(
      expectedHistory,
    );
  });
});
