import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import HistoryRecordingNodeHandler, {
  expectedHistory,
} from "../../fixtures/HistoryRecordingNodeHandler.ts";
import { createStrictSdlParser } from "../../../src/lezer/createSdlParser.ts";
import { TraversingVisitor } from "../../../src/ast/visitor/TraversingVisitor.ts";
import SdlStringInput from "../../../src/lezer/SdlStringInput.ts";
import { buildAst } from "../../../src/ast/buildAst.ts";

describe("TraversingVisitor Tests", () => {
  test("Test traversing visitor", async () => {
    const sdlSource = await fs.readFile(
      path.join(__dirname, "../../sample_specifications/sample.sdl"),
    ).then((buffer) => buffer.toString());
    const sdlStringInput = new SdlStringInput(sdlSource);
    const sdlParser = await createStrictSdlParser();
    const sdlParseTree = sdlParser.parse(sdlStringInput);
    const specification = buildAst(sdlParseTree, sdlStringInput);

    const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();
    const traversingVisitor = new TraversingVisitor(
      historyRecordingNodeHandler,
    );

    traversingVisitor.visit(specification);

    expect(
      historyRecordingNodeHandler.nodeHistory,
    ).toEqual(
      expectedHistory,
    );
  });
});
