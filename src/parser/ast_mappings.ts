import { Token } from "../../deps.ts";
import getLogger from "../util/logger.ts";
import {
  InternalParserError,
  SyntacticParserError,
} from "../util/ParserError.ts";
import TokenKind from "../tokenizer/enum/token_kind.ts";
import NodeKind from "../abstract_syntax_tree/node/enum/node_kind.ts";
import NumberLiteralKind from "../abstract_syntax_tree/node/enum/number_literal_kind.ts";
import StringLiteralKind from "../abstract_syntax_tree/node/enum/string_literal_kind.ts";
import StringVariableKind from "../abstract_syntax_tree/node/enum/string_variable_kind.ts";
import PostfixOperatorKind from "../abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import UnaryOperatorKind from "../abstract_syntax_tree/node/enum/unary_operator_kind.ts";
import BinaryOperatorKind from "../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import Node from "../abstract_syntax_tree/Node.ts";
import Alignment from "../abstract_syntax_tree/node/Alignment.ts";
import AssignmentExpression from "../abstract_syntax_tree/node/AssignmentExpression.ts";
import BinaryExpression from "../abstract_syntax_tree/node/BinaryExpression.ts";
import Comment from "../abstract_syntax_tree/node/Comment.ts";
import CompoundStatement from "../abstract_syntax_tree/node/CompoundStatement.ts";
import Expression from "../abstract_syntax_tree/node/Expression.ts";
import ExpressionStatement from "../abstract_syntax_tree/node/ExpressionStatement.ts";
import Identifier from "../abstract_syntax_tree/node/Identifier.ts";
import LengthOfExpression from "../abstract_syntax_tree/node/LengthOfExpression.ts";
import NumberLiteral from "../abstract_syntax_tree/node/NumberLiteral.ts";
import OperatorTarget from "../abstract_syntax_tree/node/OperatorTarget.ts";
import Specification from "../abstract_syntax_tree/node/Specification.ts";
import Statement from "../abstract_syntax_tree/node/Statement.ts";
import StringDefinition from "../abstract_syntax_tree/node/StringDefinition.ts";
import StringLiteral from "../abstract_syntax_tree/node/StringLiteral.ts";
import UnaryExpression from "../abstract_syntax_tree/node/UnaryExpression.ts";
import ValueTarget from "../abstract_syntax_tree/node/ValueTarget.ts";
import Location from "../abstract_syntax_tree/Location.ts";

const logger = getLogger("parser");

const DOT_SEPARATOR_REGEX = /\./g;
const ESCAPED_BACKSLASH_REGEX = /\\\\/g;
const ESCAPED_DOUBLE_QUOTE_REGEX = /\\"/g;
const FOUR_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX = /\\u[0-9A-F]{4}/g;
const EIGHT_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX = /\\U[0-9A-F]{8}/g;

function getLocation(token: Token<TokenKind>): Location {
  if (token.pos.rowBegin === 0) {
    throw new InternalParserError("Expected pos.rowBegin to be > 0", token);
  }

  if (token.pos.columnBegin === 0) {
    throw new InternalParserError("Expected pos.columnBegin to be > 0", token);
  }

  if (token.pos.index < 0) {
    throw new InternalParserError("Expected pos.index to be >= 0", token);
  }

  return {
    row: token.pos.rowBegin - 1,
    column: token.pos.columnBegin - 1,
    position: token.pos.index,
  };
}

export function getComment(commentToken: Token<TokenKind>): Comment {
  const { kind, text } = commentToken;

  if (kind !== TokenKind.COMMENT_TOKEN) {
    throw new InternalParserError(
      `Unsupported TokenKind: ${
        TokenKind[kind]
      } when mapping to a Comment node`,
      commentToken,
    );
  }

  if (!text.startsWith("//")) {
    throw new InternalParserError(
      `Missing comment start characters '//': ${text}`,
      commentToken,
    );
  }

  let commentText = text.trim();
  const totalCommentLength = commentText.length;

  commentText = commentText.substring(2).trim();

  const tokenLocation = getLocation(commentToken);
  const commentTextLocation: Location = {
    row: tokenLocation.row,
    column: tokenLocation.column + (totalCommentLength - commentText.length),
    position: tokenLocation.position +
      (totalCommentLength - commentText.length),
  };

  return emit(new Comment(tokenLocation, commentTextLocation, commentText));
}

export function getIdentifier(
  identifierToken: Token<TokenKind>,
): Identifier {
  const { kind, text } = identifierToken;

  if (kind !== TokenKind.IDENTIFIER_TOKEN) {
    throw new InternalParserError(
      `Unsupported TokenKind: ${
        TokenKind[kind]
      } when mapping to an Identifier node`,
      identifierToken,
    );
  }

  return emit(new Identifier(getLocation(identifierToken), text));
}

export function getUnaryExpression(values: [
  Token<TokenKind> | undefined,
  OperatorTarget | [
    Token<TokenKind> | undefined,
    OperatorTarget,
    Token<TokenKind> | undefined,
  ],
  Token<TokenKind> | undefined,
]): Expression {
  const [
    unaryOperatorToken,
    operatorTargetWithOptionalParenthesis,
    postfixOperatorToken,
  ] = values;

  let unaryOperatorKind: UnaryOperatorKind | undefined;
  let unaryOperatorLocation: Location | undefined;

  if (unaryOperatorToken) {
    if (unaryOperatorToken.kind === TokenKind.OPERATOR_PLUS_TOKEN) {
      unaryOperatorKind = UnaryOperatorKind.UNARY_PLUS;
    } else if (unaryOperatorToken.kind === TokenKind.OPERATOR_MINUS_TOKEN) {
      unaryOperatorKind = UnaryOperatorKind.UNARY_NEGATION;
    } else {
      throw new InternalParserError(
        `Unexpected token kind when parsing unary operator`,
        unaryOperatorToken,
      );
    }

    unaryOperatorLocation = getLocation(unaryOperatorToken);
  }

  let openParenthesisToken: Token<TokenKind> | undefined;
  let closeParenthesisToken: Token<TokenKind> | undefined;
  let operatorTarget: OperatorTarget;

  if (operatorTargetWithOptionalParenthesis instanceof Array) {
    [openParenthesisToken, operatorTarget, closeParenthesisToken] =
      operatorTargetWithOptionalParenthesis;
  } else {
    operatorTarget = operatorTargetWithOptionalParenthesis;
  }

  let openParenthesisLocation: Location | undefined;
  let closeParenthesisLocation: Location | undefined;

  if (openParenthesisToken) {
    if (!closeParenthesisToken) {
      throw new InternalParserError(
        `Missing close parenthesis`,
        openParenthesisToken,
      );
    }

    openParenthesisLocation = getLocation(openParenthesisToken);
  }

  if (closeParenthesisToken) {
    if (!openParenthesisToken) {
      throw new InternalParserError(
        `Missing open parenthesis`,
        openParenthesisToken,
      );
    }
    closeParenthesisLocation = getLocation(closeParenthesisToken);
  }

  let postfixOperatorKind: PostfixOperatorKind | undefined;
  let postfixOperatorLocation: Location | undefined;

  if (postfixOperatorToken) {
    if (
      postfixOperatorToken.kind === TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN
    ) {
      postfixOperatorKind = PostfixOperatorKind.POSTFIX_INCREMENT;
    } else if (
      postfixOperatorToken.kind === TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN
    ) {
      postfixOperatorKind = PostfixOperatorKind.POSTFIX_DECREMENT;
    } else {
      throw new InternalParserError(
        `Unexpected token kind when parsing postfix operator`,
        postfixOperatorToken,
      );
    }

    postfixOperatorLocation = getLocation(postfixOperatorToken);
  }

  return emit(
    new UnaryExpression(
      unaryOperatorLocation ?? openParenthesisLocation ?? operatorTarget.location,
      unaryOperatorKind,
      openParenthesisLocation,
      operatorTarget,
      closeParenthesisLocation,
      postfixOperatorKind,
      postfixOperatorLocation,
    ),
  );
}

export function getBinaryExpression(
  leftOperand: Expression,
  operatorAndRightOperand: [Token<TokenKind>, Expression] | undefined,
): Expression {
  if (!operatorAndRightOperand) {
    return leftOperand;
  }

  const [
    binaryOperatorToken,
    rightOperand,
  ] = operatorAndRightOperand;

  let binaryOperatorKind: BinaryOperatorKind;

  switch (binaryOperatorToken.kind) {
    case TokenKind.OPERATOR_PLUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.ADD;
      break;
    case TokenKind.OPERATOR_MINUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SUBTRACT;
      break;
    case TokenKind.OPERATOR_MULTIPLY_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.MULTIPLY;
      break;
    case TokenKind.OPERATOR_DIVIDE_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.DIVIDE;
      break;
    case TokenKind.OPERATOR_MODULUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.MODULUS;
      break;
    case TokenKind.OPERATOR_SHIFT_LEFT_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SHIFT_LEFT;
      break;
    case TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SHIFT_RIGHT;
      break;
    case TokenKind.OPERATOR_LESS_THAN_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LESS_THAN;
      break;
    case TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LESS_THAN_OR_EQUAL;
      break;
    case TokenKind.OPERATOR_GREATER_THAN_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.GREATER_THAN;
      break;
    case TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.GREATER_THAN_OR_EQUAL;
      break;
    case TokenKind.OPERATOR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.EQUAL;
      break;
    case TokenKind.OPERATOR_NOT_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.NOT_EQUAL;
      break;
    case TokenKind.OPERATOR_BINARY_AND_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.BINARY_AND;
      break;
    case TokenKind.OPERATOR_BINARY_OR_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.BINARY_OR;
      break;
    case TokenKind.OPERATOR_LOGICAL_AND_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LOGICAL_AND;
      break;
    case TokenKind.OPERATOR_LOGICAL_OR_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LOGICAL_OR;
      break;
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[binaryOperatorToken.kind]
        } when mapping to a BinaryOperatorKind`,
        binaryOperatorToken,
      );
  }

  return emit(
    new BinaryExpression(
      leftOperand,
      binaryOperatorKind,
      getLocation(binaryOperatorToken),
      rightOperand,
    ),
  );
}

export function getAssignmentExpression(
  values: [ValueTarget, Token<TokenKind>, Expression],
): AssignmentExpression {
  const [valueTarget, equalOperatorToken, expression] = values;

  return emit(
    new AssignmentExpression(
      valueTarget,
      getLocation(equalOperatorToken),
      expression,
    ),
  );
}

export function getExpressionStatement(
  values: [
    expressionOrAssignmentExpression: Expression | AssignmentExpression,
    Token<TokenKind>,
  ],
): ExpressionStatement {
  const [expressionOrAssignmentExpression, semicolonToken] = values;
  if (
    (expressionOrAssignmentExpression.kind === NodeKind.UNARY_EXPRESSION) ||
    (expressionOrAssignmentExpression.kind === NodeKind.BINARY_EXPRESSION)
  ) {
    return emit(
      new ExpressionStatement(
        expressionOrAssignmentExpression as Expression,
        getLocation(semicolonToken),
      ),
    );
  } else if (
    expressionOrAssignmentExpression.kind === NodeKind.ASSIGNMENT_EXPRESSION
  ) {
    return emit(
      new ExpressionStatement(
        expressionOrAssignmentExpression as AssignmentExpression,
        getLocation(semicolonToken),
      ),
    );
  }
  throw new InternalParserError(
    `Unsupported NodeKind: ${
      NodeKind[(expressionOrAssignmentExpression as Node).kind]
    } when mapping to ExpressionStatement`,
  );
}

export function getCompoundStatement(
  values: [Token<TokenKind>, statements: Statement[], Token<TokenKind>],
): CompoundStatement {
  const [openBraceToken, statements, closeBraceToken] = values;
  return emit(
    new CompoundStatement(
      getLocation(openBraceToken),
      statements,
      getLocation(closeBraceToken),
    ),
  );
}

export function getLengthofExpression(
  values: [Token<TokenKind>, Token<TokenKind>, ValueTarget, Token<TokenKind>],
): LengthOfExpression {
  const [
    lengthofToken,
    openParenthesisToken,
    valueTarget,
    closeParenthesisToken,
  ] = values;
  return emit(
    new LengthOfExpression(
      getLocation(lengthofToken),
      getLocation(openParenthesisToken),
      valueTarget,
      getLocation(closeParenthesisToken),
    ),
  );
}

export function getNumberLiteral(
  numberLiteralToken: Token<TokenKind>,
): NumberLiteral {
  const { kind, text } = numberLiteralToken;

  let numberLiteralKind: NumberLiteralKind;
  let stringValue: string;
  let value: number;
  switch (kind) {
    case TokenKind.LITERAL_BINARY_TOKEN:
      numberLiteralKind = NumberLiteralKind.BINARY;
      if (!text.startsWith("0b")) {
        throw new InternalParserError(
          `Missing binary literal prefix '0b': ${text}`,
          numberLiteralToken,
        );
      }

      if (text.length === 2) {
        throw new InternalParserError(
          `Missing binary literal value after prefix '0b'`,
          numberLiteralToken,
        );
      }

      stringValue = text.substring(2).trim().replaceAll(
        DOT_SEPARATOR_REGEX,
        "",
      );
      value = parseInt(stringValue, 2);

      break;
    case TokenKind.LITERAL_HEXADECIMAL_TOKEN:
      numberLiteralKind = NumberLiteralKind.HEXADECIMAL;
      if (!text.startsWith("0x")) {
        throw new InternalParserError(
          `Missing hexadecimal literal prefix '0x': ${text}`,
          numberLiteralToken,
        );
      }

      if (text.length === 2) {
        throw new InternalParserError(
          `Missing hexadecimal literal value after prefix '0x'`,
          numberLiteralToken,
        );
      }

      stringValue = text.substring(2).trim().replaceAll(
        DOT_SEPARATOR_REGEX,
        "",
      );
      value = parseInt(stringValue, 16);

      break;
    case TokenKind.LITERAL_INTEGER_TOKEN:
      numberLiteralKind = NumberLiteralKind.INTEGER;
      value = parseInt(text, 10);
      break;
    case TokenKind.LITERAL_DECIMAL_TOKEN:
      numberLiteralKind = NumberLiteralKind.DECIMAL;
      value = parseFloat(text);
      break;
    case TokenKind.LITERAL_FLOATING_POINT_TOKEN:
      numberLiteralKind = NumberLiteralKind.FLOATING_POINT;
      value = parseFloat(text);
      break;
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[kind]
        } when mapping to an NumberLiteral node`,
        numberLiteralToken,
      );
  }

  if (isNaN(value)) {
    throw new InternalParserError(
      `Unable to convert number literal string: ${value} for NumberLiteralKind: ${
        TokenKind[kind]
      } to number value`,
      numberLiteralToken,
    );
  }

  return emit(
    new NumberLiteral(
      getLocation(numberLiteralToken),
      numberLiteralKind,
      value,
      text,
    ),
  );
}

export function getStringLiteral(
  stringLiteralToken: Token<TokenKind>,
): StringLiteral {
  const { kind, text } = stringLiteralToken;

  let stringLiteralKind: StringLiteralKind;
  let value: string;
  switch (kind) {
    case TokenKind.LITERAL_STRING_BASIC_TOKEN:
      stringLiteralKind = StringLiteralKind.BASIC;
      value = text;
      break;
    case TokenKind.LITERAL_STRING_UTF8_TOKEN:
      if (!text.startsWith("u8")) {
        throw new InternalParserError(
          `Missing UTF8 prefix "u8" in string literal: ${text}`,
          stringLiteralToken,
        );
      }
      stringLiteralKind = StringLiteralKind.UTF8;
      value = text.substring(2);
      break;
    case TokenKind.LITERAL_STRING_UTF16_TOKEN:
      if (!text.startsWith("u")) {
        throw new InternalParserError(
          `Missing UTF16 prefix "u" in string literal: ${text}`,
          stringLiteralToken,
        );
      }
      stringLiteralKind = StringLiteralKind.UTF16;
      value = text.substring(1);
      break;
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[kind]
        } when mapping to an StringLiteral node`,
        stringLiteralToken,
      );
  }

  if (value[0] !== '"') {
    throw new InternalParserError(
      `Missing starting double quote in string literal: ${text}`,
      stringLiteralToken,
    );
  }

  if (value[value.length - 1] !== '"') {
    throw new InternalParserError(
      `Missing ending double quote in string literal: ${text}`,
      stringLiteralToken,
    );
  }

  value = value.substring(1, value.length - 1);
  value = value.replaceAll(ESCAPED_BACKSLASH_REGEX, "\\");
  value = value.replaceAll(ESCAPED_DOUBLE_QUOTE_REGEX, '"');

  // convert UTF characters
  if (stringLiteralKind !== StringLiteralKind.BASIC) {
    value = value.replaceAll(
      FOUR_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX,
      (match) => {
        if (!match.startsWith("\\u")) {
          throw new InternalParserError(
            `Missing prefix "\\u" in universal character name: ${match}`,
            stringLiteralToken,
          );
        }

        const codePoint = parseInt(match.substring(2), 16);

        if (isNaN(codePoint)) {
          throw new InternalParserError(
            `Unable to convert universal character name: ${codePoint} to code point number`,
            stringLiteralToken,
          );
        }

        return String.fromCodePoint(0x1234);
      },
    );

    value = value.replaceAll(
      EIGHT_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX,
      (match) => {
        if (!match.startsWith("\\U")) {
          throw new InternalParserError(
            `Missing prefix "\\U" in universal character name: ${match}`,
            stringLiteralToken,
          );
        }

        const codePoint = parseInt(match.substring(2), 16);

        if (isNaN(codePoint)) {
          throw new InternalParserError(
            `Unable to convert universal character name: ${match} to code point number`,
            stringLiteralToken,
          );
        }

        return String.fromCodePoint(codePoint);
      },
    );
  }

  return emit(
    new StringLiteral(
      getLocation(stringLiteralToken),
      stringLiteralKind,
      value,
      text,
    ),
  );
}

export function getAlignment(
  values: [
    Token<TokenKind>,
    Token<TokenKind> | undefined,
    Token<TokenKind> | undefined,
    Token<TokenKind> | undefined,
  ],
): Alignment {
  const [
    alignmentToken,
    openParenthesisToken,
    bitAlignmentToken,
    closeParenthesisToken,
  ] = values;

  let bitAlignment = 8;

  if (bitAlignmentToken) {
    const { kind, text } = bitAlignmentToken;

    if (kind !== TokenKind.LITERAL_INTEGER_TOKEN) {
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[kind]
        } when mapping to an Alignment node`,
        bitAlignmentToken,
      );
    }

    bitAlignment = parseInt(text, 10);

    if (isNaN(bitAlignment)) {
      throw new InternalParserError(
        `Unable to convert alignment integer literal: ${text} to bit alignment`,
        bitAlignmentToken,
      );
    }

    if (
      (bitAlignment !== 8) && (bitAlignment !== 16) && (bitAlignment !== 32) &&
      (bitAlignment !== 64) && (bitAlignment !== 128)
    ) {
      throw new SyntacticParserError(
        `Illegal bit alignment: ${bitAlignment}, allowed values are 8, 16, 32, 64 and 128`,
        bitAlignmentToken,
      );
    }
  }

  return emit(
    new Alignment(
      getLocation(alignmentToken),
      bitAlignment,
      bitAlignmentToken === undefined,
      openParenthesisToken ? getLocation(openParenthesisToken) : undefined,
      closeParenthesisToken ? getLocation(closeParenthesisToken) : undefined,
    ),
  );
}

export function getStringDefinition(values: [
  Token<TokenKind> | undefined, // optional const
  Alignment | undefined,
  Token<TokenKind>, // string variable type
  Identifier,
  StringLiteral | undefined,
  Token<TokenKind>, // semicolon
]): StringDefinition {
  const [
    constToken,
    alignment,
    stringVariableTypeToken,
    identifier,
    stringLiteral,
    semicolonToken,
  ] = values;

  let stringVariableKind: StringVariableKind;
  switch (stringVariableTypeToken.kind) {
    case TokenKind.KEYWORD_UTF8STRING_TOKEN:
      stringVariableKind = StringVariableKind.UTF8;
      break;
    case TokenKind.KEYWORD_UTFSTRING_TOKEN:
      stringVariableKind = StringVariableKind.UTF16;
      break;
    case TokenKind.KEYWORD_UTF8LIST_TOKEN:
      stringVariableKind = StringVariableKind.UTF8_LIST;
      break;
    case TokenKind.KEYWORD_BASE64STRING_TOKEN:
      stringVariableKind = StringVariableKind.BASE64;
      break;
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[stringVariableTypeToken.kind]
        } when mapping to a StringDefinition node`,
        stringVariableTypeToken,
      );
  }

  const stringVariableKindLocation = getLocation(stringVariableTypeToken);

  let constLocation: Location | undefined;
  if (constToken !== undefined) {
    constLocation = getLocation(constToken);
  }

  let alignmentLocation: Location | undefined;
  if (alignment) {
    alignmentLocation = alignment.location;
  }

  if (stringLiteral) {
    if (
      ((stringVariableKind ===
        StringVariableKind.BASE64) &&
        (stringLiteral.stringLiteralKind !== StringLiteralKind.BASIC)) ||
      ((stringVariableKind !==
        StringVariableKind.BASE64) &&
        (stringLiteral.stringLiteralKind === StringLiteralKind.BASIC)) ||
      ((stringVariableKind ===
        StringVariableKind.UTF16) &&
        (stringLiteral.stringLiteralKind !== StringLiteralKind.UTF16))
    ) {
      throw new SyntacticParserError(
        `Illegal string literal type: ${
          StringLiteralKind[stringLiteral.stringLiteralKind]
        } for a string variable type of ${
          StringVariableKind[stringVariableKind]
        }`,
        stringVariableTypeToken,
      );
    }
  }

  return emit(
    new StringDefinition(
      constLocation ?? alignmentLocation ?? stringVariableKindLocation,
      constToken !== undefined,
      stringVariableKind,
      stringVariableKindLocation,
      identifier,
      stringLiteral,
      getLocation(semicolonToken),
    ),
  );
}

export function getSpecification(
  globals: Array<Comment>,
): Specification {
  if (globals.length === 0) {
    throw new InternalParserError(
      "Expected at least one global declaration",
    );
  }

  return emit(new Specification(globals));
}

function emit<T>(node: T): T {
  logger.debug(
    "parsed node: %s => %j",
    NodeKind[(node as Node).kind],
    node,
  );

  return node;
}
