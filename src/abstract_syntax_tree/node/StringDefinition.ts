import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import AlignedModifier from "./AlignedModifier.ts";
import StatementKind from "./enum/statement_kind.ts";
import StringVariableKind from "./enum/string_variable_kind.ts";
import Identifier from "./Identifier.ts";
import StringLiteral from "./StringLiteral.ts";

class StringDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly stringVariableKind: StringVariableKind,
    public readonly identifier: Identifier,
    public readonly stringLiteral: StringLiteral | undefined,
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    public readonly constToken: SyntaxToken | undefined,
    public readonly stringVariableKindToken: SyntaxToken,
    public readonly assignmentPunctuatorToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.STRING_DEFINITION,
      reservedToken?.location ??
        legacyToken?.location ??
        constToken?.location ??
        alignedModifier?.location ??
        stringVariableKindToken.location,
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

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.reservedToken) {
      yield this.reservedToken;
    }
    if (this.legacyToken) {
      yield this.legacyToken;
    }
    if (this.constToken) {
      yield this.constToken;
    }
    if (this.alignedModifier) {
      yield* this.alignedModifier.getSyntaxTokenIterable();
    }
    yield this.stringVariableKindToken;
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.assignmentPunctuatorToken) {
      yield this.assignmentPunctuatorToken;
      yield* this.stringLiteral!.getSyntaxTokenIterable();
    }
    yield this.semicolonPunctuatorToken;
  }
}

export default StringDefinition;
