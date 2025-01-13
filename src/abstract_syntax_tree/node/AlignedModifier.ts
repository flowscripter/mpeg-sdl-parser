import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteral from "./NumberLiteral.ts";

class AlignedModifier extends AbstractNode {
  constructor(
    public readonly bitCount: number,
    public readonly isDefault8BitCount: boolean,
    public readonly bitCountModifier: NumberLiteral | undefined,
    public readonly alignedToken: SyntaxToken,
    public readonly openParenthesisToken?: SyntaxToken,
    public readonly closeParenthesisToken?: SyntaxToken,
  ) {
    super(NodeKind.ALIGNED_MODIFIER, alignedToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitAlignedModifier(this);
  }
}

export default AlignedModifier;
