// deno-fmt-ignore-file

import { buildLexer, Lexer, Token, TokenPosition } from "../../deps.ts";
import TokenKind from "./enum/token_kind.ts";
import * as patterns from "./patterns.ts";
import getLogger from "../util/logger.ts";
import { InternalParserError } from "../util/ParserError.ts";

const logger = getLogger("tokenizer");

function getRegExp(pattern: string) {
    return new RegExp('^' + pattern, 'gu');
}

class LoggingTokenWrapper implements Token<TokenKind> {

    readonly token: Token<TokenKind>;
    pos: TokenPosition;
    text: string;
    kind: TokenKind;

    constructor(token: Token<TokenKind>) {
        this.token = token;
        this.pos = token.pos;
        this.text = token.text;
        this.kind = token.kind;

        if (this.pos.rowBegin === 0) {
            throw new InternalParserError('Expected pos.rowBegin to be > 0', this.token);
        }
        if (this.pos.columnBegin === 0) {
            throw new InternalParserError('Expected pos.columnBegin to be > 0', this.token);
        }
        if (this.pos.index < 0) {
            throw new InternalParserError('Expected pos.index to be >= 0', this.token);
        }

        logger.debug("found token: %s => %s", TokenKind[token.kind], this.toString());
    }

    public get next(): Token<TokenKind> | undefined {
        const nextToken = this.token.next;

        if (nextToken) {

            return new LoggingTokenWrapper(nextToken);
        }

        return undefined;
    }

    public toString(): string {
        return JSON.stringify({
            kind: this.kind,
            row: this.pos.rowBegin - 1,
            column: this.pos.columnBegin - 1,
            offset: this.pos.index,
            text: this.text
        });
    }
}

export default class Tokenizer implements Lexer<TokenKind> {

    readonly lexer: Lexer<TokenKind>;

    constructor() {
        const rules: [boolean, RegExp, TokenKind][] = [
            [false, getRegExp(patterns.WHITESPACE_PATTERN), TokenKind.WHITESPACE_TOKEN],
            [true, getRegExp(patterns.COMMENT_PATTERN), TokenKind.COMMENT_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_OPEN_PARENTHESIS_PATTERN), TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_CLOSE_PARENTHESIS_PATTERN), TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_OPEN_BRACE_PATTERN), TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_CLOSE_BRACE_PATTERN), TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_OPEN_BRACKET_PATTERN), TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_CLOSE_BRACKET_PATTERN), TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_COLON_PATTERN), TokenKind.PUNCTUATOR_COLON_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_SEMICOLON_PATTERN), TokenKind.PUNCTUATOR_SEMICOLON_TOKEN],
            [true, getRegExp(patterns.PUNCTUATOR_COMMA_PATTERN), TokenKind.PUNCTUATOR_COMMA_TOKEN],
            [true, getRegExp(patterns.KEYWORD_ABSTRACT_PATTERN), TokenKind.KEYWORD_ABSTRACT_TOKEN],
            [true, getRegExp(patterns.KEYWORD_ALIGNED_PATTERN), TokenKind.KEYWORD_ALIGNED_TOKEN],
            [true, getRegExp(patterns.KEYWORD_BASE64_STRING_PATTERN), TokenKind.KEYWORD_BASE64STRING_TOKEN],
            [true, getRegExp(patterns.KEYWORD_BIT_PATTERN), TokenKind.KEYWORD_BIT_TOKEN],
            [true, getRegExp(patterns.KEYWORD_BREAK_PATTERN), TokenKind.KEYWORD_BREAK_TOKEN],
            [true, getRegExp(patterns.KEYWORD_CASE_PATTERN), TokenKind.KEYWORD_CASE_TOKEN],
            [true, getRegExp(patterns.KEYWORD_CLASS_PATTERN), TokenKind.KEYWORD_CLASS_TOKEN],
            [true, getRegExp(patterns.KEYWORD_CONST_PATTERN), TokenKind.KEYWORD_CONST_TOKEN],
            [true, getRegExp(patterns.KEYWORD_DEFAULT_PATTERN), TokenKind.KEYWORD_DEFAULT_TOKEN],
            [true, getRegExp(patterns.KEYWORD_DO_PATTERN), TokenKind.KEYWORD_DO_TOKEN],
            [true, getRegExp(patterns.KEYWORD_ELSE_PATTERN), TokenKind.KEYWORD_ELSE_TOKEN],
            [true, getRegExp(patterns.KEYWORD_EXPANDABLE_PATTERN), TokenKind.KEYWORD_EXPANDABLE_TOKEN],
            [true, getRegExp(patterns.KEYWORD_EXTENDS_PATTERN), TokenKind.KEYWORD_EXTENDS_TOKEN],
            [true, getRegExp(patterns.KEYWORD_FLOAT_PATTERN), TokenKind.KEYWORD_FLOAT_TOKEN],
            [true, getRegExp(patterns.KEYWORD_FOR_PATTERN), TokenKind.KEYWORD_FOR_TOKEN],
            [true, getRegExp(patterns.KEYWORD_IF_PATTERN), TokenKind.KEYWORD_IF_TOKEN],
            [true, getRegExp(patterns.KEYWORD_INT_PATTERN), TokenKind.KEYWORD_INT_TOKEN],
            [true, getRegExp(patterns.KEYWORD_LENGTHOF_PATTERN), TokenKind.KEYWORD_LENGTHOF_TOKEN],
            [true, getRegExp(patterns.KEYWORD_MAP_PATTERN), TokenKind.KEYWORD_MAP_TOKEN],
            [true, getRegExp(patterns.KEYWORD_SWITCH_PATTERN), TokenKind.KEYWORD_SWITCH_TOKEN],
            [true, getRegExp(patterns.KEYWORD_UNSIGNED_PATTERN), TokenKind.KEYWORD_UNSIGNED_TOKEN],
            [true, getRegExp(patterns.KEYWORD_UTF8_STRING_PATTERN), TokenKind.KEYWORD_UTF8STRING_TOKEN],
            [true, getRegExp(patterns.KEYWORD_UTF8_LIST_PATTERN), TokenKind.KEYWORD_UTF8LIST_TOKEN],
            [true, getRegExp(patterns.KEYWORD_UTF_STRING_PATTERN), TokenKind.KEYWORD_UTFSTRING_TOKEN],
            [true, getRegExp(patterns.KEYWORD_WHILE_PATTERN), TokenKind.KEYWORD_WHILE_TOKEN],
            [true, getRegExp(patterns.OPERATOR_CLASS_MEMBER_ACCESS_PATTERN), TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN],
            [true, getRegExp(patterns.OPERATOR_POSTFIX_INCREMENT_PATTERN), TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN],
            [true, getRegExp(patterns.OPERATOR_POSTFIX_DECREMENT_PATTERN), TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN],
            [true, getRegExp(patterns.OPERATOR_PLUS_PATTERN), TokenKind.OPERATOR_PLUS_TOKEN],
            [true, getRegExp(patterns.OPERATOR_MINUS_PATTERN), TokenKind.OPERATOR_MINUS_TOKEN],
            [true, getRegExp(patterns.OPERATOR_MULTIPLY_PATTERN), TokenKind.OPERATOR_MULTIPLY_TOKEN],
            [true, getRegExp(patterns.OPERATOR_DIVIDE_PATTERN), TokenKind.OPERATOR_DIVIDE_TOKEN],
            [true, getRegExp(patterns.OPERATOR_MODULUS_PATTERN), TokenKind.OPERATOR_MODULUS_TOKEN],
            [true, getRegExp(patterns.OPERATOR_SHIFT_LEFT_PATTERN), TokenKind.OPERATOR_SHIFT_LEFT_TOKEN],
            [true, getRegExp(patterns.OPERATOR_SHIFT_RIGHT_PATTERN), TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN],
            [true, getRegExp(patterns.OPERATOR_LESS_THAN_PATTERN), TokenKind.OPERATOR_LESS_THAN_TOKEN],
            [true, getRegExp(patterns.OPERATOR_LESS_THAN_OR_EQUAL_PATTERN), TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN],
            [true, getRegExp(patterns.OPERATOR_GREATER_THAN_PATTERN), TokenKind.OPERATOR_GREATER_THAN_TOKEN],
            [true, getRegExp(patterns.OPERATOR_GREATER_THAN_OR_EQUAL_PATTERN), TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN],
            [true, getRegExp(patterns.OPERATOR_EQUAL_PATTERN), TokenKind.OPERATOR_EQUAL_TOKEN],
            [true, getRegExp(patterns.OPERATOR_NOT_EQUAL_PATTERN), TokenKind.OPERATOR_NOT_EQUAL_TOKEN],
            [true, getRegExp(patterns.OPERATOR_BINARY_AND_PATTERN), TokenKind.OPERATOR_BINARY_AND_TOKEN],
            [true, getRegExp(patterns.OPERATOR_BINARY_OR_PATTERN), TokenKind.OPERATOR_BINARY_OR_TOKEN],
            [true, getRegExp(patterns.OPERATOR_LOGICAL_AND_PATTERN), TokenKind.OPERATOR_LOGICAL_AND_TOKEN],
            [true, getRegExp(patterns.OPERATOR_LOGICAL_OR_PATTERN), TokenKind.OPERATOR_LOGICAL_OR_TOKEN],
            [true, getRegExp(patterns.OPERATOR_RANGE_PATTERN), TokenKind.OPERATOR_RANGE_TOKEN],
            [true, getRegExp(patterns.OPERATOR_ASSIGNMENT_PATTERN), TokenKind.OPERATOR_ASSIGNMENT_TOKEN],
            [true, getRegExp(patterns.LITERAL_BINARY_PATTERN), TokenKind.LITERAL_BINARY_TOKEN],
            [true, getRegExp(patterns.LITERAL_HEXADECIMAL_PATTERN), TokenKind.LITERAL_HEXADECIMAL_TOKEN],
            [true, getRegExp(patterns.LITERAL_INTEGER_PATTERN), TokenKind.LITERAL_INTEGER_TOKEN],
            [true, getRegExp(patterns.LITERAL_DECIMAL_PATTERN), TokenKind.LITERAL_DECIMAL_TOKEN],
            [true, getRegExp(patterns.LITERAL_FLOATING_POINT_PATTERN), TokenKind.LITERAL_FLOATING_POINT_TOKEN],
            [true, getRegExp(patterns.LITERAL_STRING_BASIC_PATTERN), TokenKind.LITERAL_STRING_BASIC_TOKEN],
            [true, getRegExp(patterns.LITERAL_STRING_UTF8_PATTERN), TokenKind.LITERAL_STRING_UTF8_TOKEN],
            [true, getRegExp(patterns.LITERAL_STRING_UTF16_PATTERN), TokenKind.LITERAL_STRING_UTF16_TOKEN],
            [true, getRegExp(patterns.IDENTIFIER_PATTERN), TokenKind.IDENTIFIER_TOKEN],
        ];

        rules.forEach((rule) => logger.debug("adding rule: %s => %s", TokenKind[rule[2]], rule[1].toString()));

        this.lexer = buildLexer(rules);
    }

    parse(input: string): Token<TokenKind> | undefined {
        const token = this.lexer.parse(input);

        if (token) {
            return new LoggingTokenWrapper(token);
        }

        return undefined;
    }
}
