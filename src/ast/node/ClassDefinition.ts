import type Token from "../token/Token.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";
import type ParameterValueList from "./ParameterValueList.ts";

export default class ClassDefinition extends AbstractStatement {
  constructor(
    public readonly isLegacy: boolean,
    public readonly classIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly legacyKeyword: Token | undefined,
    public readonly semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.CLASS_DEFINITION,
      legacyKeyword ?? identifier.startToken,
      semicolonPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.classIdentifier;
    yield this.identifier;
    if (this.parameterValueList) {
      yield this.parameterValueList;
    }
  }
}
