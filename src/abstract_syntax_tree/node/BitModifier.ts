import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NumberLiteral from "./NumberLiteral.ts";
import Identifier from "./Identifier.ts";
import AbstractClassId from "./AbstractClassId.ts";

class BitModifier extends AbstractNode {
  constructor(
    public readonly length: NumberLiteral,
    public readonly identifier: Identifier | undefined,
    public readonly classId: AbstractClassId | undefined,
    public readonly colonToken: SyntaxToken,
    public readonly bitKeywordToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
    public readonly assignmentToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.BIT_MODIFIER, colonToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitBitModifier(this);
  }
}

export default BitModifier;
