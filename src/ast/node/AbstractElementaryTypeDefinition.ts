import type { Token } from "../token/Token.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import type { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export abstract class AbstractElementaryTypeDefinition
  extends AbstractStatement {
  constructor(
    kind: StatementKind,
    startToken: Token,
    public readonly isConst: boolean,
    public readonly elementaryType: ElementaryType,
    public readonly identifier: Identifier,
    public readonly value:
      | AbstractExpression
      | NumberLiteral
      | Identifier
      | undefined,
    public readonly constKeyword: Token | undefined,
    public readonly assignmentOperator: Token | undefined,
    public readonly semicolonPunctuator: Token,
  ) {
    super(kind, startToken, semicolonPunctuator);
  }
}
