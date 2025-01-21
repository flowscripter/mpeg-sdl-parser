import type Location from "../../tokenizer/token/Location.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type StatementKind from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";

abstract class AbstractArrayDefinition extends AbstractStatement {
  constructor(
    kind: StatementKind,
    location: Location,
    public readonly identifier: Identifier,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(kind, location);
  }
}

export default AbstractArrayDefinition;
