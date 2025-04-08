import type { Lexer } from "typescript-parsec";
import getLogger from "../util/logger.ts";
import { LexicalParserError } from "../util/ParserError.ts";
import { TokenKind } from "./enum/token_kind.ts";
import { ParsecTokenWrapper } from "./parsec/ParsecTokenWrapper.ts";
import { Trivia } from "./token/TriviaToken.ts";
import * as patterns from "./token_patterns.ts";

const logger = getLogger("Tokenizer");

/**
 * Enum representing the different kinds of matches that can be identified by the tokenizer.
 */
enum MatchKind {
  SYNTAX,
  LEADING_TRIVIA,
  TRAILING_TRIVIA,
}

/**
 * Represents the result of a token match operation.
 */
interface MatchResult {
  /**
   * The kind of token that was matched.
   */
  tokenKind: TokenKind;

  /**
   * The text of the matched token.
   */
  text: string;

  /**
   * The position in the input where the token starts.
   */
  position: number;

  /**
   * The row in the input where the token starts.
   */
  row: number;

  /**
   * The column in the input where the token starts.
   */
  column: number;

  /**
   * The row in the input where the token ends.
   */
  rowEnd: number;

  /**
   * The column in the input where the token ends.
   */
  columnEnd: number;
}

/**
 * Represents a pattern used to identify tokens in the tokenizer.
 *
 * @interface TokenPattern
 *
 * @property {TokenKind} tokenKind - The kind of token that this pattern matches.
 * @property {RegExp} regex - The regular expression used to match the token.
 */
interface TokenPattern {
  tokenKind: TokenKind;
  regex: RegExp;
}

/**
 * The `Tokenizer` class implements the `Lexer` interface for tokenizing input strings
 * into a sequence of tokens based on predefined patterns. It supports syntax tokens,
 * leading trivia tokens, and trailing trivia tokens.
 *
 * @template TokenKind - The type of tokens used by the lexer.
 */
export class Tokenizer implements Lexer<TokenKind> {
  readonly syntaxTokenPatterns: TokenPattern[] = [];
  readonly leadingTriviaTokenPatterns: TokenPattern[] = [];
  readonly trailingTriviaTokenPatterns: TokenPattern[] = [];

  private addTokenPattern(
    tokenKind: TokenKind,
    pattern: string,
    matchKind: MatchKind = MatchKind.SYNTAX,
  ) {
    const regex = new RegExp("^" + pattern, "gu");
    const tokenPattern: TokenPattern = { regex, tokenKind };

    logger.debug(
      "adding %s token pattern: %s => %s",
      MatchKind[matchKind],
      TokenKind[tokenPattern.tokenKind],
      tokenPattern.regex.toString(),
    );

    if (matchKind === MatchKind.SYNTAX) {
      this.syntaxTokenPatterns.push(tokenPattern);
    } else if (matchKind === MatchKind.LEADING_TRIVIA) {
      this.leadingTriviaTokenPatterns.push(tokenPattern);
    } else {
      this.trailingTriviaTokenPatterns.push(tokenPattern);
    }
  }

  private getParsecTokenWrapper(
    input: string,
    syntaxMatchResult: MatchResult,
    leadingTriviaMatchResults: MatchResult[],
    trailingTriviaMatchResults: MatchResult[],
  ) {
    let lastMatchResult = syntaxMatchResult;

    if (trailingTriviaMatchResults.length > 0) {
      lastMatchResult =
        trailingTriviaMatchResults[trailingTriviaMatchResults.length - 1];
    }

    return new ParsecTokenWrapper(
      this,
      input,
      syntaxMatchResult.tokenKind,
      syntaxMatchResult.text,
      leadingTriviaMatchResults.map(this.getTrivia),
      trailingTriviaMatchResults.map(this.getTrivia),
      {
        index: syntaxMatchResult.position,
        rowBegin: syntaxMatchResult.row,
        columnBegin: syntaxMatchResult.column,
        rowEnd: lastMatchResult.rowEnd,
        columnEnd: lastMatchResult.columnEnd,
      },
    );
  }

  private getTrivia(matchResult: MatchResult): Trivia {
    return new Trivia(matchResult.tokenKind, {
      position: matchResult.position,
      row: matchResult.row,
      column: matchResult.column,
    }, matchResult.text);
  }

  constructor() {
    // leading trivia token patterns
    this.addTokenPattern(
      TokenKind.WHITESPACE_TOKEN,
      patterns.WHITESPACE_PATTERN,
      MatchKind.LEADING_TRIVIA,
    );
    this.addTokenPattern(
      TokenKind.COMMENT_TOKEN,
      patterns.COMMENT_PATTERN,
      MatchKind.LEADING_TRIVIA,
    );

    // trailing trivia token patterns
    this.addTokenPattern(
      TokenKind.WHITESPACE_TOKEN,
      // note: NON_LINEFEED_WHITESPACE_PATTERN is used instead of WHITESPACE_PATTERN for trailing trivia
      patterns.NON_LINEFEED_WHITESPACE_PATTERN,
      MatchKind.TRAILING_TRIVIA,
    );
    this.addTokenPattern(
      TokenKind.COMMENT_TOKEN,
      patterns.COMMENT_PATTERN,
      MatchKind.TRAILING_TRIVIA,
    );

    // syntax token patterns
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
      patterns.PUNCTUATOR_OPEN_PARENTHESIS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
      patterns.PUNCTUATOR_CLOSE_PARENTHESIS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
      patterns.PUNCTUATOR_OPEN_BRACE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
      patterns.PUNCTUATOR_CLOSE_BRACE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
      patterns.PUNCTUATOR_OPEN_BRACKET_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
      patterns.PUNCTUATOR_CLOSE_BRACKET_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_COLON_TOKEN,
      patterns.PUNCTUATOR_COLON_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
      patterns.PUNCTUATOR_SEMICOLON_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.PUNCTUATOR_COMMA_TOKEN,
      patterns.PUNCTUATOR_COMMA_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_ABSTRACT_TOKEN,
      patterns.KEYWORD_ABSTRACT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_ALIGNED_TOKEN,
      patterns.KEYWORD_ALIGNED_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_BASE64STRING_TOKEN,
      patterns.KEYWORD_BASE64_STRING_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_BIT_TOKEN,
      patterns.KEYWORD_BIT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_BREAK_TOKEN,
      patterns.KEYWORD_BREAK_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_CASE_TOKEN,
      patterns.KEYWORD_CASE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_CLASS_TOKEN,
      patterns.KEYWORD_CLASS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_COMPUTED_TOKEN,
      patterns.KEYWORD_COMPUTED_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_CONST_TOKEN,
      patterns.KEYWORD_CONST_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_DEFAULT_TOKEN,
      patterns.KEYWORD_DEFAULT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_DO_TOKEN,
      patterns.KEYWORD_DO_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_ELSE_TOKEN,
      patterns.KEYWORD_ELSE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_EXPANDABLE_TOKEN,
      patterns.KEYWORD_EXPANDABLE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_EXTENDS_TOKEN,
      patterns.KEYWORD_EXTENDS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_FLOAT_TOKEN,
      patterns.KEYWORD_FLOAT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_FOR_TOKEN,
      patterns.KEYWORD_FOR_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_IF_TOKEN,
      patterns.KEYWORD_IF_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_INT_TOKEN,
      patterns.KEYWORD_INT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_LEGACY_TOKEN,
      patterns.KEYWORD_LEGACY_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_LENGTHOF_TOKEN,
      patterns.KEYWORD_LENGTHOF_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_MAP_TOKEN,
      patterns.KEYWORD_MAP_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_RESERVED_TOKEN,
      patterns.KEYWORD_RESERVED_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_SWITCH_TOKEN,
      patterns.KEYWORD_SWITCH_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_UNSIGNED_TOKEN,
      patterns.KEYWORD_UNSIGNED_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_UTF16STRING_TOKEN,
      patterns.KEYWORD_UTF16_STRING_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_UTF8STRING_TOKEN,
      patterns.KEYWORD_UTF8_STRING_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_UTF8LIST_TOKEN,
      patterns.KEYWORD_UTF8_LIST_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_UTFSTRING_TOKEN,
      patterns.KEYWORD_UTF_STRING_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.KEYWORD_WHILE_TOKEN,
      patterns.KEYWORD_WHILE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
      patterns.OPERATOR_CLASS_MEMBER_ACCESS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_RANGE_TOKEN,
      patterns.OPERATOR_RANGE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
      patterns.OPERATOR_POSTFIX_INCREMENT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN,
      patterns.OPERATOR_POSTFIX_DECREMENT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_PLUS_TOKEN,
      patterns.OPERATOR_PLUS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_MINUS_TOKEN,
      patterns.OPERATOR_MINUS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_MULTIPLY_TOKEN,
      patterns.OPERATOR_MULTIPLY_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_DIVIDE_TOKEN,
      patterns.OPERATOR_DIVIDE_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_MODULUS_TOKEN,
      patterns.OPERATOR_MODULUS_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_SHIFT_LEFT_TOKEN,
      patterns.OPERATOR_SHIFT_LEFT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN,
      patterns.OPERATOR_SHIFT_RIGHT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_LESS_THAN_TOKEN,
      patterns.OPERATOR_LESS_THAN_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN,
      patterns.OPERATOR_LESS_THAN_OR_EQUAL_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_GREATER_THAN_TOKEN,
      patterns.OPERATOR_GREATER_THAN_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN,
      patterns.OPERATOR_GREATER_THAN_OR_EQUAL_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_EQUAL_TOKEN,
      patterns.OPERATOR_EQUAL_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_NOT_EQUAL_TOKEN,
      patterns.OPERATOR_NOT_EQUAL_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_BITWISE_AND_TOKEN,
      patterns.OPERATOR_BINARY_AND_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_BITWISE_OR_TOKEN,
      patterns.OPERATOR_BINARY_OR_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_LOGICAL_AND_TOKEN,
      patterns.OPERATOR_LOGICAL_AND_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_LOGICAL_OR_TOKEN,
      patterns.OPERATOR_LOGICAL_OR_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
      patterns.OPERATOR_ASSIGNMENT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_BINARY_TOKEN,
      patterns.LITERAL_BINARY_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_HEXADECIMAL_TOKEN,
      patterns.LITERAL_HEXADECIMAL_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN,
      patterns.LITERAL_MULTIPLE_CHARACTER_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_INTEGER_TOKEN,
      patterns.LITERAL_INTEGER_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_DECIMAL_TOKEN,
      patterns.LITERAL_DECIMAL_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_FLOATING_POINT_TOKEN,
      patterns.LITERAL_FLOATING_POINT_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      patterns.LITERAL_STRING_BASIC_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      patterns.LITERAL_STRING_UTF_PATTERN,
    );
    this.addTokenPattern(
      TokenKind.IDENTIFIER_TOKEN,
      patterns.IDENTIFIER_PATTERN,
    );
  }

  /**
   * Parses the provided input string and returns the first syntax token found from the start of the input string.
   *
   * @param input The input string to parse
   *
   * @returns The first syntax token found in the input string, undefined if no token found
   *
   * @throws {LexicalParserError} If the input string cannot be tokenized
   */
  parse(input: string): ParsecTokenWrapper | undefined {
    return this.getNextSyntaxToken(input, 0, 1, 1);
  }

  /**
   * Parses the provided input string and returns the first syntax token found at the current position of the input string.
   *
   * @param input The input string to parse
   * @param position The current zero-based parsing position in the input string
   * @param row The current one-based parsing row in the input string
   * @param column The current one-based parsing column in the total input string
   *
   * @returns The next syntax token found in the input string, undefined if no token found
   *
   * @throws {LexicalParserError} If the input string cannot be tokenized
   */
  public getNextSyntaxToken(
    input: string,
    position: number,
    row: number,
    column: number,
  ): ParsecTokenWrapper | undefined {
    logger.debug(
      "getNextSyntaxToken: position: %d, row: %d, column: %d",
      position,
      row,
      column,
    );

    // try to match as many leading trivia tokens as possible
    const leadingTriviaMatchResults: MatchResult[] = [];

    logger.debug(
      "trying to match leading trivia tokens",
    );

    // loop until no more trivia tokens are available or EOF token is returned
    while (true) {
      const leadingTriviaMatchResult = this.matchToken(
        input,
        position,
        row,
        column,
        MatchKind.LEADING_TRIVIA,
      );

      // if no trivia token found, break out of the loop
      if (leadingTriviaMatchResult === undefined) {
        break;
      }

      // check if got EOF
      if (leadingTriviaMatchResult.tokenKind === TokenKind.EOF_TOKEN) {
        logger.debug(
          "leading triva count: %d, returning EOF_TOKEN",
          leadingTriviaMatchResults.length,
        );

        return this.getParsecTokenWrapper(
          input,
          leadingTriviaMatchResult, // the EOF syntax token match
          leadingTriviaMatchResults,
          [], // no trailing trivia
        );
      }

      // save trivia token
      leadingTriviaMatchResults.push(leadingTriviaMatchResult);

      // update position
      position += leadingTriviaMatchResult.text.length;
      row = leadingTriviaMatchResult.rowEnd;
      column = leadingTriviaMatchResult.columnEnd;
    }

    logger.debug(
      "leading triva count: %d, trying to match syntax token",
      leadingTriviaMatchResults.length,
    );

    // at this point we should expect a syntax token, EOF or no match which is considered an error
    const syntaxMatchResult = this.matchToken(
      input,
      position,
      row,
      column,
      MatchKind.SYNTAX,
    );

    // if no syntax token match found, throw an error
    if (syntaxMatchResult === undefined) {
      throw new LexicalParserError(
        `Unable to tokenize the rest of the input: ${
          input.substring(position)
        }`,
        { row, column, position },
      );
    }

    // check if got EOF
    if (syntaxMatchResult.tokenKind === TokenKind.EOF_TOKEN) {
      logger.debug(
        "leading triva count: %d, returning EOF_TOKEN",
        leadingTriviaMatchResults.length,
      );

      return this.getParsecTokenWrapper(
        input,
        syntaxMatchResult, // the EOF syntax token match
        leadingTriviaMatchResults,
        [], // no trailing trivia
      );
    }

    // update position (no need to update row as syntax token should not include a line break)
    position += syntaxMatchResult.text.length;
    column = syntaxMatchResult.columnEnd;

    // try to match trailing trivia tokens on same row as syntax token
    const trailingTriviaMatchResults: MatchResult[] = [];

    // loop until no more trivia tokens are available or EOF token is returned
    while (true) {
      // match trivia following syntax token on the same row
      const trailingTriviaMatchResult = this.matchToken(
        input,
        position,
        row,
        column,
        MatchKind.TRAILING_TRIVIA,
      );

      // if no trivia token found, break out of the loop
      if (trailingTriviaMatchResult === undefined) {
        break;
      }

      // check if got EOF
      // if no trivia token found, or EOF found break out of the loop
      if (trailingTriviaMatchResult.tokenKind === TokenKind.EOF_TOKEN) {
        // although EOF token was returned we will return syntax token now and EOF token will be returned on next invocation
        logger.debug(
          "found EOF_TOKEN while trying to match trailing trivia, will return syntax token and leave EOF for next invoocation",
        );
        break;
      }

      // save trivia token
      trailingTriviaMatchResults.push(trailingTriviaMatchResult);

      // update position (no need to update row as should be on same row as syntax token)
      position += trailingTriviaMatchResult.text.length;
      column = trailingTriviaMatchResult.columnEnd;
    }

    logger.debug(
      "leading triva count: %d, trailing trivia count: %d, returning %s",
      leadingTriviaMatchResults.length,
      trailingTriviaMatchResults.length,
      TokenKind[syntaxMatchResult.tokenKind],
    );

    // return the syntax token
    return this.getParsecTokenWrapper(
      input,
      syntaxMatchResult,
      leadingTriviaMatchResults,
      trailingTriviaMatchResults,
    );
  }

  /**
   * Match the next token in the input string
   *
   * @param input The input string to parse
   * @param position The current parsing position in the input string
   * @param row The current parsing row in the input string
   * @param column The current parsing column in the total input string
   * @param matchKind the type of token to match
   *
   * @returns The next token found in the input string, undefined if no token is found or EOF token if end of the input is reached
   */
  private matchToken(
    input: string,
    position: number,
    row: number,
    column: number,
    matchKind: MatchKind,
  ): MatchResult | undefined {
    logger.debug(
      "matchToken: position: %d, matchKind: %s",
      position,
      MatchKind[matchKind],
    );

    // if at the end of the input return EOF
    if (position === input.length) {
      logger.debug(
        "matchToken: returning EOF_TOKEN",
      );
      return {
        tokenKind: TokenKind.EOF_TOKEN,
        text: "",
        position,
        row,
        column,
        rowEnd: row,
        columnEnd: column,
      };
    }

    // start matching from the specified position
    const subString = input.substring(position);

    let matchResult: MatchResult | undefined = undefined;

    // search for the longest match from the trivia token patterns
    let tokenPatterns;

    if (matchKind === MatchKind.SYNTAX) {
      tokenPatterns = this.syntaxTokenPatterns;
    } else if (matchKind === MatchKind.LEADING_TRIVIA) {
      tokenPatterns = this.leadingTriviaTokenPatterns;
    } else {
      tokenPatterns = this.trailingTriviaTokenPatterns;
    }

    for (const { tokenKind, regex } of tokenPatterns) {
      regex.lastIndex = 0;

      if (regex.test(subString)) {
        const text = subString.substring(0, regex.lastIndex);

        let rowEnd = row;
        let columnEnd = column;

        // update end position of match
        if (matchKind === MatchKind.LEADING_TRIVIA) {
          for (const c of text) {
            switch (c) {
              case "\r":
                break;
              case "\n":
                rowEnd++;
                columnEnd = 1;
                break;
              default:
                columnEnd++;
            }
          }
        } else {
          // syntax tokens and trailing trivia tokens do not include line breaks
          columnEnd += text.length;
        }

        // if no match yet, or the match is longer than the previous, use the new match
        if (
          (matchResult === undefined) || (matchResult.text.length < text.length)
        ) {
          matchResult = {
            tokenKind,
            text,
            position,
            row,
            column,
            rowEnd,
            columnEnd,
          };
        }
      }
    }

    logger.debug(
      "matchToken: returning " +
        (matchResult ? TokenKind[matchResult!.tokenKind] : "undefined"),
    );

    return matchResult;
  }
}
