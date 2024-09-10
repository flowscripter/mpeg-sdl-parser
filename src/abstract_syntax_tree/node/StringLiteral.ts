import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import StringLiteralKind from "./enum/string_literal_kind.ts";

class StringLiteral extends Node {
  readonly stringLiteralKind: StringLiteralKind;
  readonly value: string;
  readonly verbatimValue: string;

  constructor(
    location: Location,
    stringLiteralKind: StringLiteralKind,
    value: string,
    verbatimValue: string,
  ) {
    super(NodeKind.STRING_LITERAL, location);
    this.stringLiteralKind = stringLiteralKind;
    this.value = value;
    this.verbatimValue = verbatimValue;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitStringLiteral(this);
  }
}

export default StringLiteral;
