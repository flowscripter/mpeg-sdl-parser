import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";

export class SwitchDefaultClause {
  constructor(
    public readonly statements: AbstractStatement[],
    public readonly defaultToken: SyntaxToken,
    public readonly colonToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken | undefined,
    public readonly closeBraceToken: SyntaxToken | undefined,
  ) {}
}
