import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class ParameterValueList extends AbstractCompositeNode {
  constructor(
    public readonly values: (AbstractExpression | Identifier | NumberLiteral)[],
    public readonly openParenthesisPunctuator: Token,
    public readonly commaPunctuators: Token[] | undefined,
    public readonly closeParenthesisPunctuator: Token,
  ) {
    super(
      NodeKind.PARAMETER_VALUE_LIST,
      openParenthesisPunctuator,
      closeParenthesisPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.values.length; i++) {
      yield this.values[i];
    }
  }
}
