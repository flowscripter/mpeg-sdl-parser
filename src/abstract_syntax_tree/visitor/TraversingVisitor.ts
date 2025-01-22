import getLogger from "../../util/logger.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import type AbstractCompositeNode from "../node/AbstractCompositeNode.ts";
import type AbstractLeafNode from "../node/AbstractLeafNode.ts";
import NodeKind from "../node/enum/node_kind.ts";
import type NodeVisitor from "./NodeVisitor.ts";
import VisitResult from "./visit_result.ts";

const logger = getLogger("TraversingVisitor");

/**
 * A visitor that traverses nodes and delegates operations to an optional operation visitor.
 */
class TraversingVisitor implements NodeVisitor {
  constructor(public readonly operationVisitor?: NodeVisitor) {}

  /**
   * Called before visiting a composite node.
   * @param node The composite node to visit.
   * @returns The result of the visit operation.
   */
  beforeVisit(node: AbstractCompositeNode): VisitResult {
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
        // always continue for leaf nodes
        if (!node.isComposite) {
          return VisitResult.CONTINUE;
        }

        // always continue for composite node if no operation visitor
        if (!this.operationVisitor) {
          return VisitResult.CONTINUE;
        }

        // defer to operation visitor for composite node
        return this.operationVisitor.beforeVisit(node as AbstractCompositeNode);
      default: {
        const exhaustiveCheck: never = nodeKind;
        throw new InternalParserError(
          "Unreachable code reached, case: " + exhaustiveCheck,
        );
      }
    }
  }

  /**
   * Called when visiting a leaf node.
   * @param node The leaf node to visit.
   * @returns The result of the visit operation.
   */
  visit(node: AbstractLeafNode): VisitResult {
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

          let result = VisitResult.CONTINUE;

          // defer to operation visitor for composite node if set
          if (this.operationVisitor) {
            result = this.operationVisitor.beforeVisit(compositeNode);
          }

          // stop visiting
          if (result === VisitResult.STOP) {
            return VisitResult.STOP;
          }

          // skip visiting children
          if (result === VisitResult.SKIP) {
            // always continue for composite node if no operation visitor
            if (!this.operationVisitor) {
              return VisitResult.CONTINUE;
            }

            // defer to operation visitor for composite node
            return this.operationVisitor.afterVisit(compositeNode);
          }

          for (const childNode of compositeNode.getChildNodeIterable()) {
            result = this.visit(childNode);

            if (result === VisitResult.STOP) {
              return VisitResult.STOP;
            }

            if (result === VisitResult.SKIP) {
              break;
            }
          }

          // always continue for composite node if no operation visitor
          if (!this.operationVisitor) {
            return VisitResult.CONTINUE;
          }

          // defer to operation visitor for composite node
          result = this.operationVisitor.afterVisit(compositeNode);
          return result;
        }

        // leaf node behavior
        if (!this.operationVisitor) {
          return VisitResult.CONTINUE;
        }

        return this.operationVisitor.visit(node as AbstractLeafNode);
      default: {
        const exhaustiveCheck: never = nodeKind;
        throw new InternalParserError(
          "Unreachable code reached, case: " + exhaustiveCheck,
        );
      }
    }
  }

  /**
   * Called after visiting a composite node.
   * @param node The composite node to visit.
   * @returns The result of the visit operation.
   */
  afterVisit(node: AbstractCompositeNode): VisitResult {
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
        // always continue for leaf nodes
        if (!node.isComposite) {
          return VisitResult.CONTINUE;
        }

        // always continue for composite node if no operation visitor
        if (!this.operationVisitor) {
          return VisitResult.CONTINUE;
        }

        // defer to operation visitor for composite node
        return this.operationVisitor.afterVisit(node as AbstractCompositeNode);
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
