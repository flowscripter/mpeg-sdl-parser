import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ClassDefinition extends Node {
  // TODO: implement
  //   readonly class_definition ::= identifier identifier parameter_values? semicolon
  // identifier: Identifier;
  // className must refer to the name of a class
  // className: Identifier;
  // parameterValues: Expression[];
  constructor(location: Location, _name: string) {
    super(NodeKind.CLASS_DEFINITION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDefinition(this);
  }
}

export default ClassDefinition;
