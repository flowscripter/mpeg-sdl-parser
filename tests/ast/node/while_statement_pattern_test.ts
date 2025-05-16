// import { describe, test } from "bun:test";
// import testSyntaxPattern from "../syntax_pattern_test_helper";
// import { WHILE_STATEMENT_RULE } from "../../../src/parser/syntax_rules";
// import { WhileStatement } from "../../../src/ast/node/WhileStatement";
// import { BinaryExpression } from "../../../src/ast/node/BinaryExpression";
// import { Identifier } from "../../../src/ast/node/Identifier";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind";
// import { BinaryOperatorKind } from "../../../src/ast/node/enum/binary_operator_kind";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind";
// import { CompoundStatement } from "../../../src/ast/node/CompoundStatement";
// import { ExpressionStatement } from "../../../src/ast/node/ExpressionStatement";
// import { PostfixExpression } from "../../../src/ast/node/PostfixExpression";
// import { PostfixOperatorKind } from "../../../src/ast/node/enum/postfix_operator_kind";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken";

// // // TODO: rename all of these and port them to use new framework
// describe("While Statement Pattern Tests", () => {
//   test("Test while statement pattern", () => {
//     testSyntaxPattern(
//       WHILE_STATEMENT_RULE,
//       "while (i<9) {i++;}",
//       new WhileStatement(
//         new BinaryExpression(
//           new Identifier(
//             "i",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               { row: 1, column: 8, position: 7 },
//               "i",
//               [],
//               [],
//             ),
//           ),
//           BinaryOperatorKind.LESS_THAN,
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             9,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 { row: 1, column: 10, position: 9 },
//                 "9",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_LESS_THAN_TOKEN,
//             { row: 1, column: 9, position: 8 },
//             "<",
//             [],
//             [],
//           ),
//         ),
//         new CompoundStatement(
//           [
//             new ExpressionStatement(
//               new PostfixExpression(
//                 new Identifier(
//                   "i",
//                   new SyntaxToken(
//                     TokenKind.IDENTIFIER_TOKEN,
//                     { row: 1, column: 14, position: 13 },
//                     "i",
//                     [],
//                     [],
//                   ),
//                 ),
//                 undefined,
//                 undefined,
//                 PostfixOperatorKind.POSTFIX_INCREMENT,
//                 new SyntaxToken(
//                   TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
//                   { row: 1, column: 15, position: 14 },
//                   "++",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                 { row: 1, column: 17, position: 16 },
//                 ";",
//                 [],
//                 [],
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//             { row: 1, column: 13, position: 12 },
//             "{",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//             { row: 1, column: 18, position: 17 },
//             "}",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_WHILE_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "while",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 6,
//               position: 5,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 7, position: 6 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 11, position: 10 },
//           ")",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 12,
//               position: 11,
//             }, " "),
//           ],
//         ),
//       ),
//     );
//   });
// });
