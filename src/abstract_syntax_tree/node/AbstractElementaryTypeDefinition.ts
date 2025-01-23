import type { Location } from "../../tokenizer/token/Location.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import type { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";

export abstract class AbstractElementaryTypeDefinition
  extends AbstractStatement {
  constructor(
    kind: StatementKind,
    location: Location,
    public readonly isConst: boolean,
    public readonly elementaryType: ElementaryType,
    public readonly identifier: Identifier,
    public readonly value: AbstractNode | undefined,
    public readonly constToken: SyntaxToken | undefined,
    public readonly assignmentToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(kind, location);
  }
}
