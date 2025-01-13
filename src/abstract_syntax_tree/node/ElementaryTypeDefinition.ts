import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractElementaryTypeDefinition from "./AbstractElementaryTypeDefinition.ts";
import AlignedModifier from "./AlignedModifier.ts";
import Identifier from "./Identifier.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import ElementaryType from "./ElementaryType.ts";
import LengthAttribute from "./LengthAttribute.ts";

class ParsedElementaryTypeDefinition extends AbstractElementaryTypeDefinition {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    elementaryType: ElementaryType,
    public readonly lengthAttribute: LengthAttribute,
    public readonly isLookahead: boolean,
    identifier: Identifier,
    valueExpression: AbstractExpression | undefined,
    public readonly endValueExpression: AbstractExpression | undefined,
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    constToken: SyntaxToken | undefined,
    public readonly lookaheadToken: SyntaxToken | undefined,
    assignmentToken: SyntaxToken | undefined,
    public readonly rangeOperatorToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.ELEMENTARY_TYPE_DEFINITION,
      reservedToken?.location ??
        legacyToken?.location ??
        constToken?.location ??
        alignedModifier?.location ??
        elementaryType.location,
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
    visitor.visitElementaryTypeDefinition(this);
  }
}

export default ParsedElementaryTypeDefinition;
