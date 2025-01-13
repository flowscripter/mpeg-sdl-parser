import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractMapOutputValue from "./AbstractMapOutputValue.ts";

class MapAggregateOutputValue extends AbstractMapOutputValue {
  constructor(
    public readonly outputValues: AbstractMapOutputValue[],
    public readonly openBraceToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(NodeKind.MAP_AGGREGATE_OUTPUT_VALUE, openBraceToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitAggregateMapOutputValue(this);
  }
}

export default MapAggregateOutputValue;
