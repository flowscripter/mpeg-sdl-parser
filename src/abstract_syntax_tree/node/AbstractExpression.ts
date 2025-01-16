import Location from "../../tokenizer/token/Location.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import ExpressionKind from "./enum/expression_kind.ts";
import NodeKind from "./enum/node_kind.ts";

abstract class AbstractExpression extends AbstractCompositeNode {
  constructor(
    public readonly expressionKind: ExpressionKind,
    location: Location,
  ) {
    super(NodeKind.EXPRESSION, location);
  }
}

export default AbstractExpression;
