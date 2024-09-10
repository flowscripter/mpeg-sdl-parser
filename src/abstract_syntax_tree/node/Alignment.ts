import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class Alignment extends Node {
  readonly bitAlignment: number;
  readonly isDefault8BitAlignment: boolean;
  readonly openParenthesisPunctuatorLocation?: Location;
  readonly closeParenthesisPunctuatorLocation?: Location;

  constructor(
    location: Location,
    bitAlignment: number,
    isDefault8BitAlignment: boolean,
    openParenthesisPunctuatorLocation?: Location,
    closeParenthesisPunctuatorLocation?: Location,
  ) {
    super(NodeKind.ALIGNMENT, location);
    this.bitAlignment = bitAlignment;
    this.isDefault8BitAlignment = isDefault8BitAlignment;
    this.openParenthesisPunctuatorLocation = openParenthesisPunctuatorLocation;
    this.closeParenthesisPunctuatorLocation =
      closeParenthesisPunctuatorLocation;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitAlignment(this);
  }
}

export default Alignment;
