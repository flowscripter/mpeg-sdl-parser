import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import Parameter from "./Parameter.ts";

class ParameterList extends AbstractNode {
  constructor(
    public readonly parameters: Parameter[],
    public readonly openParenthesisToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(NodeKind.PARAMETER_LIST, openParenthesisToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDefinitionParameter(this);
  }
}

export default ParameterList;
