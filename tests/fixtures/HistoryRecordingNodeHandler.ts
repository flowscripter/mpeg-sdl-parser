import type { AbstractCompositeNode } from "../../src/ast/node/AbstractCompositeNode";
import type { AbstractLeafNode } from "../../src/ast/node/AbstractLeafNode";
import { NodeKind } from "../../src/ast/node/enum/node_kind";
import type { NodeHandler } from "../../src/ast/visitor/NodeHandler";

export default class HistoryRecordingNodeHandler implements NodeHandler {
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
  "IF_CLAUSE",
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
  "IF_CLAUSE",
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

export { expectedHistory };
