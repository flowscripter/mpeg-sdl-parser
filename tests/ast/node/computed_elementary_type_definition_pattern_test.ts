// import { describe, test } from "bun:test";
// import { ComputedElementaryTypeDefinition } from "../../../src/ast/node/ComputedElementaryTypeDefinition.ts";
// import { ElementaryType } from "../../../src/ast/node/ElementaryType.ts";
// import { ElementaryTypeKind } from "../../../src/ast/node/enum/elementary_type_kind.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("Computed Elementary Type Definition Pattern Tests", () => {
//   test("Test computed elementary type definition pattern", () => {
//     testSyntaxPattern(
//       COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
//       "computed int a;",
//       new ComputedElementaryTypeDefinition(
//         false,
//         new ElementaryType(
//           ElementaryTypeKind.INTEGER,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_INT_TOKEN,
//             { row: 1, column: 10, position: 9 },
//             "int",
//             [],
//             [
//               new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                 row: 1,
//                 column: 13,
//                 position: 12,
//               }, " "),
//             ],
//           ),
//         ),
//         new Identifier(
//           "a",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 14, position: 13 },
//             "a",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_COMPUTED_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "computed",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 9,
//               position: 8,
//             }, " "),
//           ],
//         ),
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           { row: 1, column: 15, position: 14 },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test computed elementary type definition pattern - const and value", () => {
//     testSyntaxPattern(
//       COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
//       "computed const int a=3;",
//       new ComputedElementaryTypeDefinition(
//         true,
//         new ElementaryType(
//           ElementaryTypeKind.INTEGER,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_INT_TOKEN,
//             { row: 1, column: 16, position: 15 },
//             "int",
//             [],
//             [
//               new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                 row: 1,
//                 column: 19,
//                 position: 18,
//               }, " "),
//             ],
//           ),
//         ),
//         new Identifier(
//           "a",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 20, position: 19 },
//             "a",
//             [],
//             [],
//           ),
//         ),
//         new NumberLiteral(NumberLiteralKind.INTEGER, 3, [
//           new SyntaxToken(
//             TokenKind.LITERAL_INTEGER_TOKEN,
//             { row: 1, column: 22, position: 21 },
//             "3",
//             [],
//             [],
//           ),
//         ]),
//         new SyntaxToken(
//           TokenKind.KEYWORD_COMPUTED_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "computed",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 9,
//               position: 8,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_CONST_TOKEN,
//           { row: 1, column: 10, position: 9 },
//           "const",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 15,
//               position: 14,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           { row: 1, column: 21, position: 20 },
//           "=",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           { row: 1, column: 23, position: 22 },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });
// });
