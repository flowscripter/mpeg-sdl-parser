import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteralKind from "./enum/number_literal_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class NumberLiteral extends AbstractExpression {
  constructor(
    public readonly numberLiteralKind: NumberLiteralKind,
    public readonly value: number,
    // an array supports multiple concatenated multiple character literal tokens
    public readonly tokens: SyntaxToken[],
  ) {
    super(NodeKind.NUMBER_LITERAL, tokens[0].location);
    this.numberLiteralKind = numberLiteralKind;
    this.value = value;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitNumberLiteral(this);
  }
}

export default NumberLiteral;
