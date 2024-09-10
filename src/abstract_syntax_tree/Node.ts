import NodeKind from "./node/enum/node_kind.ts";
import NodeVisitor from "./NodeVisitor.ts";
import Location from "./Location.ts";

export default abstract class Node {
  readonly kind: NodeKind;
  readonly location: Location;

  constructor(kind: NodeKind, location: Location) {
    this.kind = kind;
    this.location = location;
  }

  abstract accept(visitor: NodeVisitor): void;
}
