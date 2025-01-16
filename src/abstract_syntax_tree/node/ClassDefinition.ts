import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import StatementKind from "./enum/statement_kind.ts";
import Identifier from "./Identifier.ts";
import ParameterValueList from "./ParameterValueList.ts";

class ClassDefinition extends AbstractStatement {
  constructor(
    public readonly isLegacy: boolean,
    public readonly classIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    public readonly semicolonToken: SyntaxToken,
  ) {
    super(
      StatementKind.CLASS_DEFINITION,
      legacyToken?.location ?? identifier.location,
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
      yield this.legacyToken!;
    }
    yield* this.classIdentifier.getSyntaxTokenIterable();
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.parameterValueList) {
      yield* this.parameterValueList.getSyntaxTokenIterable();
    }
    yield this.semicolonToken;
  }
}

export default ClassDefinition;
