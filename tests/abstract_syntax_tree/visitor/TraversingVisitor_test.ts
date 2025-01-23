import { assertEquals } from "@std/assert";
import * as path from "@std/path";
import {
  type AbstractCompositeNode,
  type AbstractLeafNode,
  dispatch,
  type NodeHandler,
  NodeKind,
  Parser,
  TraversingVisitor,
} from "../../../mod.ts";

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

Deno.test("Test traversing visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();
  const traversingVisitor = new TraversingVisitor(historyRecordingNodeHandler);

  traversingVisitor.visit(parsedSpecification);

  assertEquals(
    historyRecordingNodeHandler.nodeHistory,
    expectedHistory,
  );
});

Deno.test("Test traversing visitor - dispatch", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const historyRecordingNodeHandler = new HistoryRecordingNodeHandler();

  dispatch(parsedSpecification, historyRecordingNodeHandler);

  assertEquals(
    historyRecordingNodeHandler.nodeHistory,
    expectedHistory,
  );
});
