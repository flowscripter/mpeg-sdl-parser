import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import AbstractExpression from "./AbstractExpression.ts";
import ArrayDimensionKind from "./enum/array_dimension_kind.ts";

class ExplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly sizeExpression: AbstractExpression,
    public readonly openBracketToken: SyntaxToken,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.EXPLICIT, openBracketToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitExplicitArrayDimension(this);
  }
}

export default ExplicitArrayDimension;
