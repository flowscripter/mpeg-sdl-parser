import type Location from "./Location.ts";

import getLogger from "../../util/logger.ts";
import TokenKind from "../enum/token_kind.ts";
import AbstractToken from "./AbstractToken.ts";

const logger = getLogger("TriviaToken");

/**
 * Represents a trivia token in the tokenizer.
 *
 * @remarks
 * This class extends the `AbstractToken` class and is used to handle
 * tokens that are considered trivia, such as whitespace or comments.
 *
 * @param tokenKind - The kind of token.
 * @param location - The location of the token in the source code.
 * @param text - The text content of the token.
 */
class Trivia extends AbstractToken {
  constructor(
    tokenKind: TokenKind,
    location: Location,
    text: string,
  ) {
    super(tokenKind, location, text);
    logger.debug(
      "TriviaToken: %s => position: %d, row: %d, column: %d",
      TokenKind[this.tokenKind],
      this.location.position,
      this.location.row,
      this.location.column,
    );
  }

  public override toString(): string {
    return this.text;
  }
}

export default Trivia;
