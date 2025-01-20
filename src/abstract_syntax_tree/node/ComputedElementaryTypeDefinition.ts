import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractElementaryTypeDefinition from "./AbstractElementaryTypeDefinition.ts";
import AbstractNode from "./AbstractNode.ts";
import ElementaryType from "./ElementaryType.ts";
import StatementKind from "./enum/statement_kind.ts";
import Identifier from "./Identifier.ts";

class ComputedElementaryTypeDefinition
  extends AbstractElementaryTypeDefinition {
  constructor(
    isConst: boolean,
    elementaryType: ElementaryType,
    identifier: Identifier,
    value: AbstractNode | undefined,
    public readonly computedToken: SyntaxToken,
    constToken: SyntaxToken | undefined,
    assignmentToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.COMPUTED_ELEMENTARY_TYPE_DEFINITION,
      computedToken.location,
      isConst,
      elementaryType,
      identifier,
      value,
      constToken,
      assignmentToken,
      semicolonPunctuatorToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.elementaryType;
    yield this.identifier;
    if (this.value) {
      yield this.value;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.computedToken;
    if (this.isConst) {
      yield this.constToken!;
    }
    yield* this.elementaryType.getSyntaxTokenIterable();
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.value) {
      yield this.assignmentToken!;
      yield* this.value.getSyntaxTokenIterable();
    }
    yield this.semicolonPunctuatorToken;
  }
}

export default ComputedElementaryTypeDefinition;
