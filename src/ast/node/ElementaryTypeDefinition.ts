import type { Token } from "../token/Token.ts";
import { AbstractElementaryTypeDefinition } from "./AbstractElementaryTypeDefinition.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AlignedModifier } from "./AlignedModifier.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import type { Identifier } from "./Identifier.ts";
import type { LengthAttribute } from "./LengthAttribute.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class ElementaryTypeDefinition extends AbstractElementaryTypeDefinition {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    elementaryType: ElementaryType,
    public readonly lengthAttribute: LengthAttribute,
    public readonly isLookahead: boolean,
    identifier: Identifier,
    value: AbstractExpression | NumberLiteral | Identifier | undefined,
    public readonly endValue:
      | AbstractExpression
      | NumberLiteral
      | Identifier
      | undefined,
    public readonly reservedKeyword: Token | undefined,
    public readonly legacyKeyword: Token | undefined,
    constKeyword: Token | undefined,
    public readonly lookaheadOperator: Token | undefined,
    assignmentOperator: Token | undefined,
    public readonly rangeOperator: Token | undefined,
    semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.ELEMENTARY_TYPE_DEFINITION,
      reservedKeyword ??
        legacyKeyword ??
        constKeyword ??
        alignedModifier?.startToken ??
        elementaryType?.startToken,
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
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    yield this.elementaryType;
    yield this.lengthAttribute;

    yield this.identifier;

    if (this.value) {
      yield this.value;

      if (this.endValue) {
        yield this.endValue;
      }
    }
  }
}
