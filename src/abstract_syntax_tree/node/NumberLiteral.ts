import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteralKind from "./enum/number_literal_kind.ts";

class NumberLiteral extends Node {
  readonly numberLiteralKind: NumberLiteralKind;
  readonly value: number;
  readonly verbatimValue: string;

  constructor(
    location: Location,
    numberLiteralKind: NumberLiteralKind,
    value: number,
    verbatimValue: string,
  ) {
    super(NodeKind.NUMBER_LITERAL, location);
    this.numberLiteralKind = numberLiteralKind;
    this.value = value;
    this.verbatimValue = verbatimValue;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitNumberLiteral(this);
  }
}

export default NumberLiteral;
