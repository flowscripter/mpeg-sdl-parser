import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NumberLiteral from "./NumberLiteral.ts";

class ExpandableModifier extends AbstractNode {
  constructor(
    public readonly maxClassSize: NumberLiteral | undefined,
    public readonly expandableToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.EXPANDABLE_MODIFIER, expandableToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitExpandableModifier(this);
  }
}

export default ExpandableModifier;
