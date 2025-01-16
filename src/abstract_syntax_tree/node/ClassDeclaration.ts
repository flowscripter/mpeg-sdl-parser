import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import AlignedModifier from "./AlignedModifier.ts";
import BitModifier from "./BitModifier.ts";
import StatementKind from "./enum/statement_kind.ts";
import ExpandableModifier from "./ExpandableModifier.ts";
import ExtendsModifier from "./ExtendsModifier.ts";
import Identifier from "./Identifier.ts";
import ParameterList from "./ParameterList.ts";

class ClassDeclaration extends AbstractStatement {
  constructor(
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly expandableModifier: ExpandableModifier | undefined,
    public readonly isAbstract: boolean,
    public readonly identifier: Identifier,
    public readonly parameterList: ParameterList | undefined,
    public readonly extendsModifier: ExtendsModifier | undefined,
    public readonly bitModifier: BitModifier | undefined,
    public readonly statements: AbstractStatement[],
    public readonly abstractToken: SyntaxToken | undefined,
    public readonly classToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(
      StatementKind.CLASS_DECLARATION,
      alignedModifier?.location ?? expandableModifier?.location ??
        identifier.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    if (this.expandableModifier) {
      yield this.expandableModifier;
    }

    yield this.identifier;

    if (this.parameterList) {
      yield this.parameterList;
    }

    if (this.extendsModifier) {
      yield this.extendsModifier;
    }

    if (this.bitModifier) {
      yield this.bitModifier;
    }

    for (const statement of this.statements) {
      yield statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.alignedModifier) {
      yield* this.alignedModifier.getSyntaxTokenIterable();
    }

    if (this.expandableModifier) {
      yield* this.expandableModifier.getSyntaxTokenIterable();
    }

    if (this.isAbstract) {
      yield this.abstractToken!;
    }

    yield this.classToken;
    yield* this.identifier.getSyntaxTokenIterable();

    if (this.parameterList) {
      yield* this.parameterList.getSyntaxTokenIterable();
    }

    if (this.extendsModifier) {
      yield* this.extendsModifier.getSyntaxTokenIterable();
    }

    if (this.bitModifier) {
      yield* this.bitModifier.getSyntaxTokenIterable();
    }

    yield this.openBraceToken;

    for (const statement of this.statements) {
      yield* statement.getSyntaxTokenIterable();
    }

    yield this.closeBraceToken;
  }
}

export default ClassDeclaration;
