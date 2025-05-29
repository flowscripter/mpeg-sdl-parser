import type Token from "../token/Token.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type AlignedModifier from "./AlignedModifier.ts";
import type BitModifier from "./BitModifier.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type ExpandableModifier from "./ExpandableModifier.ts";
import type ExtendsModifier from "./ExtendsModifier.ts";
import type Identifier from "./Identifier.ts";
import type ParameterList from "./ParameterList.ts";

export default class ClassDeclaration extends AbstractStatement {
  constructor(
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly expandableModifier: ExpandableModifier | undefined,
    public readonly isAbstract: boolean,
    public readonly identifier: Identifier,
    public readonly parameterList: ParameterList | undefined,
    public readonly extendsModifier: ExtendsModifier | undefined,
    public readonly bitModifier: BitModifier | undefined,
    public readonly statements: AbstractStatement[],
    public readonly abstractKeyword: Token | undefined,
    public readonly classKeyword: Token,
    public readonly openBracePunctuator: Token,
    public readonly closeBracePunctuator: Token,
  ) {
    super(
      StatementKind.CLASS_DECLARATION,
      alignedModifier?.startToken ?? expandableModifier?.startToken ??
        classKeyword,
      closeBracePunctuator,
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
}
