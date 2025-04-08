import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { ParameterValueList } from "./ParameterValueList.ts";

export class ClassDefinition extends AbstractStatement {
  constructor(
    public readonly isLegacy: boolean,
    public readonly classIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly legacyKeywordToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.CLASS_DEFINITION,
      legacyKeywordToken?.location ?? identifier.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.classIdentifier;
    yield this.identifier;
    if (this.parameterValueList) {
      yield this.parameterValueList;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.isLegacy) {
      yield this.legacyKeywordToken!;
    }
    yield* this.classIdentifier.getSyntaxTokenIterable();
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.parameterValueList) {
      yield* this.parameterValueList.getSyntaxTokenIterable();
    }
    yield this.semicolonPunctuatorToken;
  }
}
