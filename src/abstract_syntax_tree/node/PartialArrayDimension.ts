import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import AbstractExpression from "./AbstractExpression.ts";
import ArrayDimensionKind from "./enum/array_dimension_kind.ts";

class PartialArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly indexExpression: AbstractExpression,
    public readonly openBracketToken: SyntaxToken,
    public readonly innerOpenBracketToken: SyntaxToken,
    public readonly innerCloseBracketToken: SyntaxToken,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.PARTIAL, openBracketToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitPartialArrayDimension(this);
  }
}

export default PartialArrayDimension;
