import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Identifier } from "./Identifier.ts";

export class ClassMemberAccess extends AbstractCompositeNode {
  constructor(
    public readonly memberIdentifier: Identifier,
    public readonly classMemberAccessOperator: Token,
  ) {
    super(
      NodeKind.CLASS_MEMBER_ACCESS,
      classMemberAccessOperator,
      memberIdentifier.endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.memberIdentifier;
  }
}
