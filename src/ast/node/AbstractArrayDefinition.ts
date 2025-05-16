import type { Location } from "../../Location.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";

export abstract class AbstractArrayDefinition extends AbstractStatement {
  constructor(
    kind: StatementKind,
    location: Location,
    public readonly identifier: Identifier,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(kind, location);
  }
}
