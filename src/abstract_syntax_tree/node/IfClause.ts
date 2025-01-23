import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";

export class IfClause {
  constructor(
    public readonly condition: AbstractNode | undefined,
    public readonly statement: AbstractStatement,
    public readonly ifToken: SyntaxToken | undefined,
    public readonly elseToken: SyntaxToken | undefined,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {}
}
