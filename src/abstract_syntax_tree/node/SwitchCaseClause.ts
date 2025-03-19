import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class SwitchCaseClause {
  constructor(
    public readonly value: NumberLiteral,
    public readonly statements: AbstractStatement[],
    public readonly caseToken: SyntaxToken,
    public readonly colonToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken | undefined,
    public readonly breakToken: SyntaxToken,
    public readonly semicolonToken: SyntaxToken,
    public readonly closeBraceToken: SyntaxToken | undefined,
  ) {}
}
