import type Token from "../token/Token.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type AlignedModifier from "./AlignedModifier.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { StringVariableKind } from "./enum/string_variable_kind.ts";
import type Identifier from "./Identifier.ts";
import type StringLiteral from "./StringLiteral.ts";

export default class StringDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly stringVariableKind: StringVariableKind,
    public readonly identifier: Identifier,
    public readonly stringLiteral: StringLiteral | undefined,
    public readonly reservedKeyword: Token | undefined,
    public readonly legacyKeyword: Token | undefined,
    public readonly constKeyword: Token | undefined,
    public readonly stringVariableKindToken: Token,
    public readonly assignmentPunctuator: Token | undefined,
    public readonly semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.STRING_DEFINITION,
      reservedKeyword ??
        legacyKeyword ??
        constKeyword ??
        alignedModifier?.startToken ??
        stringVariableKindToken,
      semicolonPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    yield this.identifier;
    if (this.stringLiteral) {
      yield this.stringLiteral;
    }
  }
}
