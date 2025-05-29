import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import HistoryRecordingNodeHandler, {
  expectedHistory,
} from "./fixtures/HistoryRecordingNodeHandler.ts";
import { buildAst } from "../src/ast/buildAst.ts";
import {
  createLenientSdlParser,
  createStrictSdlParser,
} from "../src/lezer/createSdlParser.ts";
import {
  collateParseErrors,
  dispatchNodeHandler,
  prettyPrint,
} from "../src/parseHelper.ts";
import SdlStringInput from "../src/lezer/SdlStringInput.ts";

const strictSdlParser = await createStrictSdlParser();
const lenientSdlParser = await createLenientSdlParser();

describe("Parse Helper Tests", () => {
  test("Test collateParseErrors", async () => {
    const sdlString = await fs.readFile(
      path.join(__dirname, "./sample_specifications/invalid.sdl"),
    ).then((buffer) => buffer.toString());

    const sdlStringInput = new SdlStringInput(sdlString);
    const parseTree = lenientSdlParser.parse(sdlStringInput);
    const parseErrors = collateParseErrors(parseTree, sdlStringInput);

    expect(parseErrors).toHaveLength(5);
    expect(parseErrors[0].errorLine).toEqual(
      "  bit           transport_priority;",
    );
    expect(parseErrors[1].errorLine).toEqual("  unsigned int N = 184;");
    expect(parseErrors[2].errorLine).toEqual(
      "  if (adaptation_ field_control == 0b01 || adaptation_field_control == 0b11) {",
    );
    expect(parseErrors[3].errorLine).toEqual(
      "  if (adaptation_ field_control == 0b01 || adaptation_field_control == 0b11) {",
    );
    expect(parseErrors[4].errorLine).toEqual(
      "  if (adaptation_ field_control == 0b01 || adaptation_field_control == 0b11) {",
    );
    expect(parseErrors[0].location!.column).toEqual(17);
    expect(parseErrors[1].location!.column).toEqual(16);
    expect(parseErrors[2].location!.column).toEqual(19);
    expect(parseErrors[3].location!.column).toEqual(76);
    expect(parseErrors[4].location!.column).toEqual(78);
  });

  test("Test prettyPrint", async () => {
    const sdlString = await fs.readFile(
      path.join(__dirname, "./sample_specifications/various_elements.sdl"),
    ).then((buffer) => buffer.toString());
    const expectedSdlString = await fs.readFile(
      path.join(
        __dirname,
        "./sample_specifications/prettified_various_elements.sdl",
      ),
    ).then((buffer) => buffer.toString());

    const sdlStringInput = new SdlStringInput(sdlString);
    const parseTree = strictSdlParser.parse(sdlStringInput);
    const specification = buildAst(parseTree, sdlStringInput);

    const prettifiedSdlString = await prettyPrint(specification);

    expect(
      prettifiedSdlString,
    ).toEqual(
      expectedSdlString,
    );
  });

  test("Test dispatchNodeHandler", async () => {
    const sdlString = await fs.readFile(
      path.join(__dirname, "./sample_specifications/sample.sdl"),
    ).then((buffer) => buffer.toString());

    const sdlStringInput = new SdlStringInput(sdlString);
    const parseTree = strictSdlParser.parse(sdlStringInput);
    const specification = buildAst(parseTree, sdlStringInput);

    const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();

    dispatchNodeHandler(specification, historyRecordingNodeHandler);

    expect(
      historyRecordingNodeHandler.nodeHistory,
    ).toEqual(
      expectedHistory,
    );
  });
});
