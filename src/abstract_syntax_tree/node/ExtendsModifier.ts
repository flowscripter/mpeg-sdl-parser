import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";
import ParameterValueList from "./ParameterValueList.ts";

class ExtendsModifier extends AbstractNode {
  constructor(
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly extendsToken: SyntaxToken,
  ) {
    super(NodeKind.EXTENDS_MODIFIER, extendsToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitExtendsModifier(this);
  }
}

export default ExtendsModifier;
