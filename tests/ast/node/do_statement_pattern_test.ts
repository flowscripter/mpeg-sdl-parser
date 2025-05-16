// import { describe, test } from "bun:test";
// import { BinaryExpression } from "../../../src/ast/node/BinaryExpression.ts";
// import { CompoundStatement } from "../../../src/ast/node/CompoundStatement.ts";
// import { DoStatement } from "../../../src/ast/node/DoStatement.ts";
// import { BinaryOperatorKind } from "../../../src/ast/node/enum/binary_operator_kind.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { PostfixOperatorKind } from "../../../src/ast/node/enum/postfix_operator_kind.ts";
// import { ExpressionStatement } from "../../../src/ast/node/ExpressionStatement.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { PostfixExpression } from "../../../src/ast/node/PostfixExpression.ts";
// import { DO_STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("Do Statement Pattern Tests", () => {
//   test("Test do statement pattern", () => {
//     testSyntaxPattern(
//       DO_STATEMENT_RULE,
//       "do {i++;} while (i<3);",
//       new DoStatement(
//         new CompoundStatement(
//           [
//             new ExpressionStatement(
//               new PostfixExpression(
//                 new Identifier(
//                   "i",
//                   new SyntaxToken(
//                     TokenKind.IDENTIFIER_TOKEN,
//                     { row: 1, column: 5, position: 4 },
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
//                   { row: 1, column: 6, position: 5 },
//                   "++",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                 { row: 1, column: 8, position: 7 },
//                 ";",
//                 [],
//                 [],
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//             { row: 1, column: 4, position: 3 },
//             "{",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//             { row: 1, column: 9, position: 8 },
//             "}",
//             [],
//             [
//               new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                 row: 1,
//                 column: 10,
//                 position: 9,
//               }, " "),
//             ],
//           ),
//         ),
//         new BinaryExpression(
//           new Identifier(
//             "i",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               { row: 1, column: 18, position: 17 },
//               "i",
//               [],
//               [],
//             ),
//           ),
//           BinaryOperatorKind.LESS_THAN,
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             3,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 { row: 1, column: 20, position: 19 },
//                 "3",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_LESS_THAN_TOKEN,
//             { row: 1, column: 19, position: 18 },
//             "<",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_DO_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "do",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 3,
//               position: 2,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_WHILE_TOKEN,
//           { row: 1, column: 11, position: 10 },
//           "while",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 16,
//               position: 15,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 17, position: 16 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 21, position: 20 },
//           ")",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           { row: 1, column: 22, position: 21 },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });
// });
