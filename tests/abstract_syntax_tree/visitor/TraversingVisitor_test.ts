import { describe, expect, test } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import {
  type AbstractCompositeNode,
  type AbstractLeafNode,
  dispatch,
  type NodeHandler,
  NodeKind,
  Parser,
  TraversingVisitor,
} from "../../../index.ts";

const expectedHistory = [
  "SPECIFICATION",
  "STATEMENT",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "STATEMENT",
  "ELEMENTARY_TYPE",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "STATEMENT",
  "EXPRESSION",
  "EXPRESSION",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "EXPRESSION",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "STATEMENT",
  "STATEMENT",
  "IDENTIFIER",
  "IDENTIFIER",
  "STATEMENT",
  "EXPRESSION",
  "IDENTIFIER",
  "EXPRESSION",
  "EXPRESSION",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "EXPRESSION",
  "IDENTIFIER",
  "CLASS_MEMBER_ACCESS",
  "IDENTIFIER",
  "STATEMENT",
  "EXPRESSION",
  "EXPRESSION",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "EXPRESSION",
  "IDENTIFIER",
  "NUMBER_LITERAL",
  "STATEMENT",
  "STATEMENT",
  "ARRAY_ELEMENT_TYPE",
  "ELEMENTARY_TYPE",
  "LENGTH_ATTRIBUTE",
  "NUMBER_LITERAL",
  "IDENTIFIER",
  "ARRAY_DIMENSION",
  "IDENTIFIER",
];

class HistoryRecordingNodeHandler implements NodeHandler {
  nodeHistory: string[] = [];

  beforeVisit(node: AbstractCompositeNode): void {
    this.nodeHistory.push(NodeKind[node.nodeKind]);
  }

  visit(node: AbstractLeafNode): void {
    this.nodeHistory.push(NodeKind[node.nodeKind]);
  }

  afterVisit(_node: AbstractCompositeNode): void {
  }
}

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

  test("Test traversing visitor - dispatch", async () => {
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
