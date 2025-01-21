import getLogger from "../../util/logger.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import type AbstractCompositeNode from "../node/AbstractCompositeNode.ts";
import type AbstractNode from "../node/AbstractNode.ts";
import NodeKind from "../node/enum/node_kind.ts";
import type NodeVisitor from "./NodeVisitor.ts";

const logger = getLogger("TraversingVisitor");

class TraversingVisitor implements NodeVisitor {
  constructor(public readonly operationVisitor?: NodeVisitor) {}

  /**
   * Visits a node before traversing its children.
   *
   * This method is called before the traversal of the children of the given node.
   * It performs specific actions based on the type of the node.
   *
   * @param node - The node to visit.
   * @returns A boolean indicating whether to continue the traversal.
   *
   * @throws {InternalParserError} If an unhandled node kind is encountered.
   */
  visitBefore(node: AbstractNode): boolean {
    const nodeKind = node.nodeKind;

    logger.debug("visitBefore: %s", NodeKind[node.nodeKind]);

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
        if (this.operationVisitor) {
          if (!this.operationVisitor.visitBefore(node)) {
            return false;
          }
          if (node.isComposite) {
            for (
              const child of (node as AbstractCompositeNode)
                .getChildNodeIterable()
            ) {
              if (!child.accept(this)) {
                return false;
              }
            }
          }
        }
        return true;
      default: {
        const exhaustiveCheck: never = nodeKind;
        throw new InternalParserError(
          "Unreachable code reached, case: " + exhaustiveCheck,
        );
      }
    }
  }

  /**
   * Visits a node after its children have been visited.
   *
   * @param node - The node to visit.
   * @returns A boolean indicating whether the visit was successful.
   *
   * This method logs the kind of node being visited and performs an operation
   * based on the node's kind. If the node kind matches one of the specified
   * cases, it delegates the visit to the `operationVisitor` if it exists.
   * Otherwise, it throws an `InternalParserError` for unreachable code.
   *
   * @throws {InternalParserError} If an unknown node kind is encountered.
   */
  visitAfter(node: AbstractNode): boolean {
    const nodeKind = node.nodeKind;

    logger.debug("visitAfter: %s", NodeKind[node.nodeKind]);

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
        if (this.operationVisitor) {
          return this.operationVisitor.visitAfter(node);
        }
        return true;
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
