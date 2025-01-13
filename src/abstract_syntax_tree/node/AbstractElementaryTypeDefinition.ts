import Location from "../../tokenizer/token/Location.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractExpression from "./AbstractExpression.ts";
import AbstractStatement from "./AbstractStatement.ts";
import ElementaryType from "./ElementaryType.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";

abstract class AbstractElementaryTypeDefinition extends AbstractStatement {
  constructor(
    kind: NodeKind,
    location: Location,
    public readonly isConst: boolean,
    public readonly elementaryType: ElementaryType,
    public readonly identifier: Identifier,
    public readonly valueExpression: AbstractExpression | undefined,
    public readonly constToken: SyntaxToken | undefined,
    public readonly assignmentToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(kind, location);
  }
}

export default AbstractElementaryTypeDefinition;
