// import { describe, test } from "bun:test";
// import { ElementaryType } from "../../../src/ast/node/ElementaryType.ts";
// import { ElementaryTypeKind } from "../../../src/ast/node/enum/elementary_type_kind.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { MapDefinition } from "../../../src/ast/node/MapDefinition.ts";
// import { MAP_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("Map Definition Pattern Tests", () => {
//   test("Test map definition pattern - reserved with elementary type output", () => {
//     testSyntaxPattern(
//       MAP_DEFINITION_RULE,
//       "reserved unsigned int(Offsets) offset;",
//       new MapDefinition(
//         true,
//         false,
//         new ElementaryType(
//           ElementaryTypeKind.UNSIGNED_INTEGER,
//           new SyntaxToken(
//             TokenKind.KEYWORD_UNSIGNED_TOKEN,
//             { row: 1, column: 10, position: 9 },
//             "unsigned",
//             [],
//             [
//               new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                 row: 1,
//                 column: 18,
//                 position: 17,
//               }, " "),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.KEYWORD_INT_TOKEN,
//             { row: 1, column: 19, position: 18 },
//             "int",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         new Identifier(
//           "Offsets",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 23, position: 22 },
//             "Offsets",
//             [],
//             [],
//           ),
//         ),
//         new Identifier(
//           "offset",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 32, position: 31 },
//             "offset",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_RESERVED_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "reserved",
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
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 22, position: 21 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 30, position: 29 },
//           ")",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 31,
//               position: 30,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           { row: 1, column: 38, position: 37 },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test map definition pattern - legacy with class output", () => {
//     testSyntaxPattern(
//       MAP_DEFINITION_RULE,
//       "legacy B(MapB) b;",
//       new MapDefinition(
//         false,
//         true,
//         undefined,
//         new Identifier(
//           "B",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 8, position: 7 },
//             "B",
//             [],
//             [],
//           ),
//         ),
//         new Identifier(
//           "MapB",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 10, position: 9 },
//             "MapB",
//             [],
//             [],
//           ),
//         ),
//         new Identifier(
//           "b",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 16, position: 15 },
//             "b",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_LEGACY_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "legacy",
//           [],
//           [
//             new Trivia(TokenKind.WHITESPACE_TOKEN, {
//               row: 1,
//               column: 7,
//               position: 6,
//             }, " "),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 9, position: 8 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 14, position: 13 },
//           ")",
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
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           { row: 1, column: 17, position: 16 },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });
// });
