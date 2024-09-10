import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

/* 6.2 Constant-length direct representation bit fields */
/* Rule E.1: Elementary data types */
/* Rule E.2: Look-ahead parsing */
/* 6.3 Variable length direct representation bit fields */
abstract class VariableDefinition extends Node {
  readonly isConst: boolean;
  // TODO: implement
  //   elementaryType: ElementaryTypeKind;
  //   identifier: Identifier;
  //   value?: NumberValue;
  constructor(kind: NodeKind, location: Location, isConst: boolean) {
    super(kind, location);
    this.isConst = isConst;
  }
  public accept(visitor: NodeVisitor) {
    visitor.visitVariableDefinition(this);
  }
}

export default VariableDefinition;
