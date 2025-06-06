import type { Token } from "../token/Token.ts";
import { AbstractElementaryTypeDefinition } from "./AbstractElementaryTypeDefinition.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class ComputedElementaryTypeDefinition
  extends AbstractElementaryTypeDefinition {
  constructor(
    isConst: boolean,
    elementaryType: ElementaryType,
    identifier: Identifier,
    value: AbstractExpression | Identifier | NumberLiteral | undefined,
    public readonly computedKeyword: Token,
    constKeyword: Token | undefined,
    assignmentOperator: Token | undefined,
    semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.COMPUTED_ELEMENTARY_TYPE_DEFINITION,
      computedKeyword,
      isConst,
      elementaryType,
      identifier,
      value,
      constKeyword,
      assignmentOperator,
      semicolonPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.elementaryType;
    yield this.identifier;
    if (this.value) {
      yield this.value;
    }
  }
}
