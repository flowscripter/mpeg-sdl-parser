import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export abstract class AbstractClassId extends AbstractCompositeNode {
  constructor(
    public readonly classIdKind: ClassIdKind,
    startToken: Token,
    endToken: Token,
  ) {
    super(NodeKind.CLASS_ID, startToken, endToken);
  }

  toString(): string {
    return ClassIdKind[this.classIdKind];
  }
}
