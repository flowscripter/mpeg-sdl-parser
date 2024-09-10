import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ClassDeclaration extends Node {
  // TODO: implement
  //   readonly expandable_modifier ::= expandable (open_parenthesis positive_integer close_parenthesis)?
  //   readonly extends_modifier ::= extends identifier parameter_values?
  //   readonly class_declaration ::= aligned_modifier? expandable_modifier? abstract? class identifier parameter_list? extends_modifier? bit_modifier? open_brace statement* close_brace
  // isAbstract: boolean;
  // alignment?: number;
  // expandable?: number;
  // identifier: Identifier;
  // parameters: ClassDefinitionParameter[];
  //
  // // parentClass must refer to the name of a class
  // parentClass?: Identifier;
  // bitAttribute?: ClassDefinitionBitAttribute;
  // statements: Statement[];
  constructor(location: Location, _name: string) {
    super(NodeKind.CLASS_DECLARATION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDeclaration(this);
  }
}

export default ClassDeclaration;
