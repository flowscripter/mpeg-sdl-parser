import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export abstract class AbstractExpression extends AbstractCompositeNode {
  constructor(
    public readonly expressionKind: ExpressionKind,
    startToken: Token,
    endToken: Token,
  ) {
    super(NodeKind.EXPRESSION, startToken, endToken);
  }

  toString(): string {
    return ExpressionKind[this.expressionKind];
  }
}
