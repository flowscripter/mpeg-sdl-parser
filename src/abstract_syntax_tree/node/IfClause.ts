import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";

class IfClause {
  constructor(
    public readonly condition: AbstractNode | undefined,
    public readonly statement: AbstractStatement,
    public readonly ifToken: SyntaxToken | undefined,
    public readonly elseToken: SyntaxToken | undefined,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {}
}

export default IfClause;
