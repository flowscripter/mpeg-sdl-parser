import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class Comment extends Node {
  readonly commentTextLocation: Location;
  readonly commentText: string;

  constructor(
    location: Location,
    commentTextLocation: Location,
    commentText: string,
  ) {
    super(NodeKind.COMMENT, location);
    this.commentTextLocation = commentTextLocation;
    this.commentText = commentText;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitComment(this);
  }
}

export default Comment;
