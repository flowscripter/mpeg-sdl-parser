import getLogger from "../../util/logger.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import type AbstractCompositeNode from "../node/AbstractCompositeNode.ts";
import type AbstractLeafNode from "../node/AbstractLeafNode.ts";
import type AbstractNode from "../node/AbstractNode.ts";
import NodeKind from "../node/enum/node_kind.ts";
import type NodeHandler from "./NodeHandler.ts";
import type NodeVisitor from "./NodeVisitor.ts";

const logger = getLogger("TraversingVisitor");

/**
 * A visitor that traverses nodes and delegates operations to a node handler.
 */
class TraversingVisitor implements NodeVisitor {
  constructor(public readonly nodeHandler: NodeHandler) {}

  /**
   * Called when visiting a node.
   * @param node The node to visit.
   */
  visit(node: AbstractNode): void {
    const nodeKind = node.nodeKind;

    logger.debug("visit: %s", NodeKind[node.nodeKind]);

    switch (nodeKind) {
      case NodeKind.ALIGNED_MODIFIER:
      case NodeKind.ARRAY_DIMENSION:
      case NodeKind.ARRAY_ELEMENT_ACCESS:
      case NodeKind.ARRAY_ELEMENT_TYPE:
      case NodeKind.BIT_MODIFIER:
      case NodeKind.CLASS_ID:
      case NodeKind.CLASS_MEMBER_ACCESS:
      case NodeKind.ELEMENTARY_TYPE:
      case NodeKind.EXPRESSION:
      case NodeKind.EXPANDABLE_MODIFIER:
      case NodeKind.EXTENDS_MODIFIER:
      case NodeKind.IDENTIFIER:
      case NodeKind.LENGTH_ATTRIBUTE:
      case NodeKind.MAP_ENTRY:
      case NodeKind.MAP_ENTRY_LIST:
      case NodeKind.MAP_OUTPUT_VALUE:
      case NodeKind.NUMBER_LITERAL:
      case NodeKind.PARAMETER:
      case NodeKind.PARAMETER_LIST:
      case NodeKind.PARAMETER_VALUE_LIST:
      case NodeKind.SPECIFICATION:
      case NodeKind.STATEMENT:
      case NodeKind.STRING_LITERAL:
        // composite node behavior
        if (node.isComposite) {
          const compositeNode = node as AbstractCompositeNode;

          this.nodeHandler.beforeVisit(compositeNode);

          for (const childNode of compositeNode.getChildNodeIterable()) {
            this.visit(childNode);
          }

          this.nodeHandler.afterVisit(compositeNode);
        } else {
          this.nodeHandler.visit(node as AbstractLeafNode);
        }
        break;
      default: {
        const exhaustiveCheck: never = nodeKind;
        throw new InternalParserError(
          "Unreachable code reached, case: " + exhaustiveCheck,
        );
      }
    }
  }
}

export default TraversingVisitor;
