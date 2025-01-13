import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractElementaryTypeDefinition from "./AbstractElementaryTypeDefinition.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractExpression from "./AbstractExpression.ts";
import Identifier from "./Identifier.ts";
import ElementaryType from "./ElementaryType.ts";

class ComputedElementaryDefinition extends AbstractElementaryTypeDefinition {
  constructor(
    isConst: boolean,
    elementaryType: ElementaryType,
    identifier: Identifier,
    valueExpression: AbstractExpression | undefined,
    public readonly computedToken: SyntaxToken,
    constToken: SyntaxToken | undefined,
    assignmentToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.COMPUTED_ELEMENTARY_TYPE_DEFINITION,
      computedToken.location,
      isConst,
      elementaryType,
      identifier,
      valueExpression,
      constToken,
      assignmentToken,
      semicolonPunctuatorToken,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitComputedElementaryTypeDefinition(this);
  }
}

export default ComputedElementaryDefinition;
