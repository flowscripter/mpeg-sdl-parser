import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import { dispatch, Parser } from "../../../index.ts";
import HistoryRecordingNodeHandler, {
  expectedHistory,
} from "../../fixtures/HistoryRecordingNodeHandler.ts";

describe("Dispatch Tests", () => {
  test("Test dispatch", async () => {
    const originalSampleSdlSpecification = await fs.readFile(
      path.join(__dirname, "../../sample_specifications/sample.sdl"),
    ).then((buffer) => buffer.toString());
    const parser = new Parser();
    const parsedSpecification = parser.parse(originalSampleSdlSpecification);
    const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();

    dispatch(parsedSpecification, historyRecordingNodeHandler);

    expect(
      historyRecordingNodeHandler.nodeHistory,
    ).toEqual(
      expectedHistory,
    );
  });
});
