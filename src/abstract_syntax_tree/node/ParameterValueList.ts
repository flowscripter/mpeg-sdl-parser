import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class ParameterValueList extends AbstractNode {
  constructor(
    public readonly valueExpressions: AbstractExpression[],
    public readonly openParenthesisToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(
      NodeKind.PARAMETER_VALUE_LIST,
      openParenthesisToken.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitParameterValueList(this);
  }
}

export default ParameterValueList;
