import AggregateMapOutputValue from "./AggregateMapOutputValue.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NumberLiteral from "./NumberLiteral.ts";

class MapEntry extends AbstractStatement {
  constructor(
    public readonly inputValue: NumberLiteral,
    public readonly outputValue: AggregateMapOutputValue,
    public readonly commaToken: SyntaxToken,
  ) {
    super(NodeKind.MAP_ENTRY, inputValue.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapEntry(this);
  }
}

export default MapEntry;
