import {
  apply,
  type Parser,
  tok,
  type Token as ParsecToken,
  type TokenPosition,
} from "typescript-parsec";
import { TokenKind } from "../enum/token_kind.ts";
import { SyntaxToken } from "../token/SyntaxToken.ts";
import type { Trivia } from "../token/TriviaToken.ts";
import type { Tokenizer } from "../Tokenizer.ts";

/**
 * Wrapper around Parsec's Token interface to provide a SyntaxToken instance
 */
export class ParsecTokenWrapper implements ParsecToken<TokenKind> {
  private nextToken: ParsecTokenWrapper | undefined | null;
  private syntaxToken: SyntaxToken | undefined;

  constructor(
    private readonly tokenizer: Tokenizer,
    private readonly input: string,
    public kind: TokenKind,
    public text: string,
    public leadingTrivia: Trivia[] = [],
    public trailingTrivia: Trivia[] = [],
    public pos: TokenPosition,
  ) {
  }

  /**
   * Get the next token in the input string from the current token's position
   *
   * @returns the next token in the input string, or undefined if there are no more tokens
   *
   * @throws {LexicalParserError} If the input string cannot be tokenized
   */
  public get next(): ParsecTokenWrapper | undefined {
    // if current token is EOF, then we know there are no more tokens, so return undefined
    if (this.kind === TokenKind.EOF_TOKEN) {
      return undefined;
    }

    // if nextToken is undefined, call the tokenizer to get the next token
    if (this.nextToken === undefined) {
      this.nextToken = this.tokenizer.getNextSyntaxToken(
        this.input,
        this.pos.index + this.text.length +
          this.trailingTrivia.reduce<number>(
            (acc, t) => acc + t.text.length,
            0,
          ),
        this.pos.rowEnd,
        this.pos.columnEnd,
      );

      // if no more tokens are found, set nextToken to null to indicate that there are no more tokens
      // and avoid calling the tokenizer again
      if (this.nextToken === undefined) {
        this.nextToken = null;
      }
    }

    return this.nextToken === null ? undefined : this.nextToken;
  }

  public getSyntaxToken(): SyntaxToken {
    if (this.syntaxToken === undefined) {
      this.syntaxToken = new SyntaxToken(
        this.kind,
        {
          position: this.pos.index,
          row: this.pos.rowBegin,
          column: this.pos.columnBegin,
        },
        this.text,
        this.leadingTrivia,
        this.trailingTrivia,
      );
    }

    return this.syntaxToken;
  }
}

/**
 * Helper function to unwrap a ParsecTokenWrapper token into a SyntaxToken
 * @param parsecToken the ParsecTokenWrapper token to unwrap
 * @returns the unwrapped SyntaxToken
 */
function unwrapToken(parsecToken: ParsecToken<TokenKind>): SyntaxToken {
  return (parsecToken as ParsecTokenWrapper).getSyntaxToken();
}

/**
 * Creates a parser that matches a specific token kind and applies a transformation to the matched token.
 *
 * @param toMatch - The kind of token to match.
 * @returns A parser that matches the specified token kind and returns a transformed syntax token.
 */
export function getToken(toMatch: TokenKind): Parser<TokenKind, SyntaxToken> {
  return apply(
    tok(toMatch),
    unwrapToken,
  );
}
