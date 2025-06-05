import type Token from "../token/Token.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";

export default abstract class AbstractArrayDefinition
  extends AbstractStatement {
  constructor(
    kind: StatementKind,
    startToken: Token,
    public readonly identifier: Identifier,
    public readonly semicolonPunctuator: Token,
  ) {
    super(kind, startToken, semicolonPunctuator);
  }
}
