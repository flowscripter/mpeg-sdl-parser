import type Token from "../token/Token.ts";
import AbstractNode from "./AbstractNode.ts";
import type { NodeKind } from "./enum/node_kind.ts";

export default abstract class AbstractLeafNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    startToken: Token,
    endToken: Token,
  ) {
    super(nodeKind, startToken, endToken, false);
  }
}
