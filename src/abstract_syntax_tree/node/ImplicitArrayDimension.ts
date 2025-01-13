import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import ArrayDimensionKind from "./enum/array_dimension_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class ImplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly rangeStartExpression: AbstractExpression | undefined,
    public readonly rangeEndExpression: AbstractExpression | undefined,
    public readonly openBracketToken: SyntaxToken,
    public readonly rangeOperatorToken: SyntaxToken | undefined,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.IMPLICIT, openBracketToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitImplicitArrayDimension(this);
  }
}

export default ImplicitArrayDimension;
