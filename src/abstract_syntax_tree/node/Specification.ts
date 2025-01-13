import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";

class Specification extends AbstractNode {
  readonly globals: Array<AbstractNode>;

  constructor(globals: Array<AbstractNode>) {
    super(NodeKind.SPECIFICATION, globals[0].location);
    this.globals = globals;
  }

  public accept(visitor: NodeVisitor) {
    this.globals.forEach((currentGlobal) => currentGlobal.accept(visitor));
    visitor.visitSpecification(this);
  }
}

export default Specification;
