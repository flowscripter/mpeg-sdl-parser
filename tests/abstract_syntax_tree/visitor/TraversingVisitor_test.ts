import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import { Parser, TraversingVisitor } from "../../../index.ts";
import HistoryRecordingNodeHandler, {
  expectedHistory,
} from "../../fixtures/HistoryRecordingNodeHandler.ts";

describe("TraversingVisitor Tests", () => {
  test("Test traversing visitor", async () => {
    const originalSampleSdlSpecification = await fs.readFile(
      path.join(__dirname, "../../sample_specifications/sample.sdl"),
    ).then((buffer) => buffer.toString());
    const parser = new Parser();
    const parsedSpecification = parser.parse(originalSampleSdlSpecification);
    const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();
    const traversingVisitor = new TraversingVisitor(
      historyRecordingNodeHandler,
    );

    traversingVisitor.visit(parsedSpecification);

    expect(
      historyRecordingNodeHandler.nodeHistory,
    ).toEqual(
      expectedHistory,
    );
  });
});
