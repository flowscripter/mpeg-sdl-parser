import TokenKind from "../enum/token_kind.ts";
import type Trivia from "./TriviaToken.ts";
import type Location from "./Location.ts";
import getLogger from "../../util/logger.ts";
import AbstractToken from "./AbstractToken.ts";

const logger = getLogger("SyntaxToken");

/**
 * Represents a syntax token in the tokenizer.
 *
 * @extends AbstractToken
 */
class SyntaxToken extends AbstractToken {
  /**
   * Creates an instance of SyntaxToken.
   *
   * @param tokenKind - The kind of token.
   * @param location - The location of the token in the source.
   * @param text - The text of the token.
   * @param leadingTrivia - An array of trivia tokens that appear before this token.
   * @param trailingTrivia - An array of trivia tokens that appear after this token.
   */
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

  /**
   * Converts the token to a string representation, including leading and trailing trivia.
   *
   * @returns The string representation of the token.
   */
  public override toString(): string {
    return this.leadingTrivia.join("") +
      this.text +
      this.trailingTrivia.join("");
  }
}

export default SyntaxToken;
