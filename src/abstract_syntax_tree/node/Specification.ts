import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import Comment from "./Comment.ts";

class Specification extends Node {
  // TODO: implement
  //  Specification ::= (comment | class_declaration | (class_declaration comment))+
  readonly globals: Array<Comment>;

  constructor(globals: Array<Comment>) {
    super(NodeKind.SPECIFICATION, globals[0].location);
    this.globals = globals;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitSpecification(this);
  }
}

export default Specification;
