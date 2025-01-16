import getLogger from "../../util/logger.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import AbstractNode from "../node/AbstractNode.ts";
import NodeKind from "../node/enum/node_kind.ts";
import NodeVisitor from "./NodeVisitor.ts";

const logger = getLogger("TraversingVisitor");

class TraversingVisitor implements NodeVisitor {
  constructor(public readonly operationVisitor?: NodeVisitor) {}

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
          return this.operationVisitor.visitBefore(node);
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
