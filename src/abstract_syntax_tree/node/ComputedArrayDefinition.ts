import AbstractArrayDefinition from "./AbstractArrayDefinition.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import Identifier from "./Identifier.ts";
import ElementaryType from "./ElementaryType.ts";
import ExplicitArrayDimension from "./ExplicitArrayDimension.ts";

class ComputedArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly elementaryType: ElementaryType,
    identifier: Identifier,
    public readonly dimensions: ExplicitArrayDimension[],
    public readonly computedToken: SyntaxToken,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.COMPUTED_ARRAY_DEFINITION,
      computedToken.location,
      identifier,
      semicolonPunctuatorToken,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitComputedArrayDefinition(this);
  }
}

export default ComputedArrayDefinition;
