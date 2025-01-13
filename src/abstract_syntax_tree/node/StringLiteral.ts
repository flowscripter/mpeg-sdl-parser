import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import StringLiteralKind from "./enum/string_literal_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class StringLiteral extends AbstractNode {
  constructor(
    public readonly stringLiteralKind: StringLiteralKind,
    public readonly value: string,
    // an array supports multiple concatenated string literal tokens
    public readonly stringLiteralTokens: SyntaxToken[],
  ) {
    super(NodeKind.STRING_LITERAL, stringLiteralTokens[0].location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitStringLiteral(this);
  }
}

export default StringLiteral;
