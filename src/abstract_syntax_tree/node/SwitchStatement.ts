import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import StatementKind from "./enum/statement_kind.ts";

class SwitchStatement extends AbstractStatement {
  // TODO: implement
  constructor() {
    super(StatementKind.SWITCH, {
      position: 0,
      row: 0,
      column: 0,
    });
  }

  // TODO: implement
  override getChildNodeIterable(): IterableIterator<AbstractNode> {
    throw new Error("Method not implemented.");
  }

  // TODO: implement
  override getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    throw new Error("Method not implemented.");
  }
}

export default SwitchStatement;
