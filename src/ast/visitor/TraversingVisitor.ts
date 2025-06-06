import getLogger from "../../util/logger.ts";
import type { AbstractCompositeNode } from "../node/AbstractCompositeNode.ts";
import type { AbstractLeafNode } from "../node/AbstractLeafNode.ts";
import type { AbstractNode } from "../node/AbstractNode.ts";
import { NodeKind } from "../node/enum/node_kind.ts";
import type { NodeHandler } from "./NodeHandler.ts";
import type { NodeVisitor } from "./NodeVisitor.ts";

const logger = getLogger("TraversingVisitor");

/**
 * A visitor that traverses nodes and delegates operations to a node handler.
 */
export class TraversingVisitor implements NodeVisitor {
  constructor(public readonly nodeHandler: NodeHandler) {}

  depth = 0;

  /**
   * Called when visiting a node.
   * @param node The node to visit.
   */
  visit(node: AbstractNode): void {
    const indent = "  ".repeat(this.depth);

    logger.debug(
      "visit: %s %s => %s",
      indent,
      NodeKind[node.nodeKind],
      node.toString(),
    );

    if (node.isComposite) {
      const compositeNode = node as AbstractCompositeNode;

      this.nodeHandler.beforeVisit(compositeNode);

      for (const childNode of compositeNode.getChildNodeIterable()) {
        this.depth++;
        this.visit(childNode);
        this.depth--;
      }

      this.nodeHandler.afterVisit(compositeNode);
    } else {
      this.nodeHandler.visit(node as AbstractLeafNode);
    }
  }
}
