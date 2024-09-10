import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import StringVariableKind from "./enum/string_variable_kind.ts";
import Identifier from "./Identifier.ts";
import Alignment from "./Alignment.ts";
import StringLiteral from "./StringLiteral.ts";

class StringDefinition extends Node {
  readonly isConst: boolean;
  readonly constLocation?: Location;
  readonly alignment?: Alignment;
  readonly stringVariableKind: StringVariableKind;
  readonly stringVariableKindLocation: Location;
  readonly identifier: Identifier;
  readonly stringLiteral?: StringLiteral;
  readonly semicolonLocation: Location;
  constructor(
    location: Location,
    isConst: boolean,
    stringVariableKind: StringVariableKind,
    stringVariableKindLocation: Location,
    identifier: Identifier,
    stringLiteral: StringLiteral | undefined,
    semicolonLocation: Location,
  ) {
    super(NodeKind.STRING_DEFINITION, location);
    this.isConst = isConst;
    this.stringVariableKind = stringVariableKind;
    this.stringVariableKindLocation = stringVariableKindLocation;
    this.identifier = identifier;
    this.stringLiteral = stringLiteral;
    this.semicolonLocation = semicolonLocation;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitStringDefinition(this);
  }
}

export default StringDefinition;
