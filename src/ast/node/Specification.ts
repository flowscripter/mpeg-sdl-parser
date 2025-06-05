import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import type ClassDeclaration from "./ClassDeclaration.ts";
import type ComputedElementaryTypeDefinition from "./ComputedElementaryTypeDefinition.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type MapDeclaration from "./MapDeclaration.ts";

export default class Specification extends AbstractCompositeNode {
  constructor(
    public readonly globals: Array<
      ComputedElementaryTypeDefinition | MapDeclaration | ClassDeclaration
    >,
  ) {
    super(
      NodeKind.SPECIFICATION,
      globals[0].startToken,
      globals[globals.length - 1].endToken,
    );
    this.globals = globals;
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const currentGlobal of this.globals) {
      yield currentGlobal;
    }
  }
}
