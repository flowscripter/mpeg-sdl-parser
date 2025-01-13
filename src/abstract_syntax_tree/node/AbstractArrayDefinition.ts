import Location from "../../tokenizer/token/Location.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractStatement from "./AbstractStatement.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";

abstract class AbstractArrayDefinition extends AbstractStatement {
  constructor(
    kind: NodeKind,
    location: Location,
    public readonly identifier: Identifier,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(kind, location);
  }
}

export default AbstractArrayDefinition;
