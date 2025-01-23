import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Identifier } from "./Identifier.ts";

export class ClassMemberAccess extends AbstractCompositeNode {
  constructor(
    public readonly memberIdentifier: Identifier,
    public readonly classMemberAccessOperatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.CLASS_MEMBER_ACCESS,
      classMemberAccessOperatorToken.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.memberIdentifier;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.classMemberAccessOperatorToken;
    yield* this.memberIdentifier.getSyntaxTokenIterable();
  }
}
