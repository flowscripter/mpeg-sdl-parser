import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import Identifier from "./Identifier.ts";
import ElementaryType from "./ElementaryType.ts";

class MapDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly classIdentifier: Identifier | undefined,
    public readonly mapIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
    public readonly semicolonToken: SyntaxToken,
  ) {
    super(
      NodeKind.MAP_DEFINITION,
      reservedToken?.location ?? legacyToken?.location ??
        elementaryType?.location ?? classIdentifier!.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapDefinition(this);
  }
}

export default MapDefinition;
