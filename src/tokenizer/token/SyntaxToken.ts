import TokenKind from "../enum/token_kind.ts";
import type Trivia from "./TriviaToken.ts";
import type Location from "./Location.ts";
import getLogger from "../../util/logger.ts";
import AbstractToken from "./AbstractToken.ts";

const logger = getLogger("SyntaxToken");

class SyntaxToken extends AbstractToken {
  constructor(
    tokenKind: TokenKind,
    location: Location,
    text: string,
    public leadingTrivia: Trivia[],
    public trailingTrivia: Trivia[],
  ) {
    super(tokenKind, location, text);
    logger.debug(
      "SyntaxToken: %s => position: %d, row: %d, column: %d",
      TokenKind[this.tokenKind],
      this.location.position,
      this.location.row,
      this.location.column,
    );
  }

  public override toString(): string {
    return this.leadingTrivia.join("") +
      this.text +
      this.trailingTrivia.join("");
  }
}

export default SyntaxToken;
