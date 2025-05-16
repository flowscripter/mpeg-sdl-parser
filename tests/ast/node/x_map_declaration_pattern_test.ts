// import { describe, test } from "bun:test";
// import { AggregateMapOutputValue } from "../../../src/ast/node/AggregateMapOutputValue.ts";
// import { ElementaryType } from "../../../src/ast/node/ElementaryType.ts";
// import { ElementaryTypeKind } from "../../../src/ast/node/enum/elementary_type_kind.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { LengthAttribute } from "../../../src/ast/node/LengthAttribute.ts";
// import { MapDeclaration } from "../../../src/ast/node/MapDeclaration.ts";
// import { MapEntry } from "../../../src/ast/node/MapEntry.ts";
// import { MapEntryList } from "../../../src/ast/node/MapEntryList.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { SingleMapOutputValue } from "../../../src/ast/node/SingleMapOutputValue.ts";
// import { MAP_DECLARATION_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // TODO: rename all of these and port them to use new framework
// // describe("Map Declaration Pattern Tests", () => {
//   test("Test map declaration pattern - elementary type output", () => {
//     testSyntaxPattern(
//       MAP_DECLARATION_RULE,
//       "map offsets (int) {0b00,{1024},0b01,{2048}}",
//       new MapDeclaration(
//         new Identifier(
//           "offsets",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 5, position: 4 },
//             "offsets",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 12, position: 11 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         new ElementaryType(
//           ElementaryTypeKind.INTEGER,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_INT_TOKEN,
//             { row: 1, column: 14, position: 13 },
//             "int",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         new MapEntryList(
//           [
//             new MapEntry(
//               new NumberLiteral(
//                 NumberLiteralKind.BINARY,
//                 0,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_BINARY_TOKEN,
//                     { row: 1, column: 20, position: 19 },
//                     "0b00",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new AggregateMapOutputValue(
//                 [
//                   new SingleMapOutputValue(
//                     new NumberLiteral(
//                       NumberLiteralKind.INTEGER,
//                       1024,
//                       [
//                         new SyntaxToken(
//                           TokenKind.LITERAL_INTEGER_TOKEN,
//                           { row: 1, column: 26, position: 25 },
//                           "1024",
//                           [],
//                           [],
//                         ),
//                       ],
//                     ),
//                     undefined,
//                     undefined,
//                   ),
//                 ],
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                   { row: 1, column: 25, position: 24 },
//                   "{",
//                   [],
//                   [],
//                 ),
//                 undefined,
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                   { row: 1, column: 30, position: 29 },
//                   "}",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 24, position: 23 },
//                 ",",
//                 [],
//                 [],
//               ),
//             ),
//             new MapEntry(
//               new NumberLiteral(
//                 NumberLiteralKind.BINARY,
//                 1,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_BINARY_TOKEN,
//                     { row: 1, column: 32, position: 31 },
//                     "0b01",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new AggregateMapOutputValue(
//                 [
//                   new SingleMapOutputValue(
//                     new NumberLiteral(
//                       NumberLiteralKind.INTEGER,
//                       2048,
//                       [
//                         new SyntaxToken(
//                           TokenKind.LITERAL_INTEGER_TOKEN,
//                           { row: 1, column: 38, position: 37 },
//                           "2048",
//                           [],
//                           [],
//                         ),
//                       ],
//                     ),
//                     undefined,
//                     undefined,
//                   ),
//                 ],
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                   { row: 1, column: 37, position: 36 },
//                   "{",
//                   [],
//                   [],
//                 ),
//                 undefined,
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                   { row: 1, column: 42, position: 41 },
//                   "}",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 36, position: 35 },
//                 ",",
//                 [],
//                 [],
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//             { row: 1, column: 19, position: 18 },
//             "{",
//             [],
//             [],
//           ),
//           [
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_COMMA_TOKEN,
//               { row: 1, column: 31, position: 30 },
//               ",",
//               [],
//               [],
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//             { row: 1, column: 43, position: 42 },
//             "}",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_MAP_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "map",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 4, position: 3 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 13, position: 12 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 17, position: 16 },
//           ")",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 18, position: 17 },
//               " ",
//             ),
//           ],
//         ),
//       ),
//     );
//   });

//   test("Test map declaration pattern - class output", () => {
//     testSyntaxPattern(
//       MAP_DECLARATION_RULE,
//       "map barMap (Bar) {0b00,{1024}}",
//       new MapDeclaration(
//         new Identifier(
//           "barMap",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 5, position: 4 },
//             "barMap",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 11, position: 10 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         undefined,
//         new Identifier(
//           "Bar",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 13, position: 12 },
//             "Bar",
//             [],
//             [],
//           ),
//         ),
//         new MapEntryList(
//           [
//             new MapEntry(
//               new NumberLiteral(
//                 NumberLiteralKind.BINARY,
//                 0,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_BINARY_TOKEN,
//                     { row: 1, column: 19, position: 18 },
//                     "0b00",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new AggregateMapOutputValue(
//                 [
//                   new SingleMapOutputValue(
//                     new NumberLiteral(
//                       NumberLiteralKind.INTEGER,
//                       1024,
//                       [
//                         new SyntaxToken(
//                           TokenKind.LITERAL_INTEGER_TOKEN,
//                           { row: 1, column: 25, position: 24 },
//                           "1024",
//                           [],
//                           [],
//                         ),
//                       ],
//                     ),
//                     undefined,
//                     undefined,
//                   ),
//                 ],
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                   { row: 1, column: 24, position: 23 },
//                   "{",
//                   [],
//                   [],
//                 ),
//                 undefined,
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                   { row: 1, column: 29, position: 28 },
//                   "}",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 23, position: 22 },
//                 ",",
//                 [],
//                 [],
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//             { row: 1, column: 18, position: 17 },
//             "{",
//             [],
//             [],
//           ),
//           undefined,
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//             { row: 1, column: 30, position: 29 },
//             "}",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_MAP_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "map",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 4, position: 3 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 12, position: 11 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 16, position: 15 },
//           ")",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 17, position: 16 },
//               " ",
//             ),
//           ],
//         ),
//       ),
//     );
//   });

//   test("Test map declaration pattern - nested outputs", () => {
//     testSyntaxPattern(
//       MAP_DECLARATION_RULE,
//       "map barMap (Bar) {0b00,{1024,{1,2}}}",
//       new MapDeclaration(
//         new Identifier(
//           "barMap",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 5, position: 4 },
//             "barMap",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 11, position: 10 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         undefined,
//         new Identifier(
//           "Bar",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 13, position: 12 },
//             "Bar",
//             [],
//             [],
//           ),
//         ),
//         new MapEntryList(
//           [
//             new MapEntry(
//               new NumberLiteral(
//                 NumberLiteralKind.BINARY,
//                 0,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_BINARY_TOKEN,
//                     { row: 1, column: 19, position: 18 },
//                     "0b00",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new AggregateMapOutputValue(
//                 [
//                   new SingleMapOutputValue(
//                     new NumberLiteral(
//                       NumberLiteralKind.INTEGER,
//                       1024,
//                       [
//                         new SyntaxToken(
//                           TokenKind.LITERAL_INTEGER_TOKEN,
//                           { row: 1, column: 25, position: 24 },
//                           "1024",
//                           [],
//                           [],
//                         ),
//                       ],
//                     ),
//                     undefined,
//                     undefined,
//                   ),
//                   new AggregateMapOutputValue(
//                     [
//                       new SingleMapOutputValue(
//                         new NumberLiteral(
//                           NumberLiteralKind.INTEGER,
//                           1,
//                           [
//                             new SyntaxToken(
//                               TokenKind.LITERAL_INTEGER_TOKEN,
//                               { row: 1, column: 31, position: 30 },
//                               "1",
//                               [],
//                               [],
//                             ),
//                           ],
//                         ),
//                         undefined,
//                         undefined,
//                       ),
//                       new SingleMapOutputValue(
//                         new NumberLiteral(
//                           NumberLiteralKind.INTEGER,
//                           2,
//                           [
//                             new SyntaxToken(
//                               TokenKind.LITERAL_INTEGER_TOKEN,
//                               { row: 1, column: 33, position: 32 },
//                               "2",
//                               [],
//                               [],
//                             ),
//                           ],
//                         ),
//                         undefined,
//                         undefined,
//                       ),
//                     ],
//                     new SyntaxToken(
//                       TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                       { row: 1, column: 30, position: 29 },
//                       "{",
//                       [],
//                       [],
//                     ),
//                     [
//                       new SyntaxToken(
//                         TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                         { row: 1, column: 32, position: 31 },
//                         ",",
//                         [],
//                         [],
//                       ),
//                     ],
//                     new SyntaxToken(
//                       TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                       { row: 1, column: 34, position: 33 },
//                       "}",
//                       [],
//                       [],
//                     ),
//                   ),
//                 ],
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                   { row: 1, column: 24, position: 23 },
//                   "{",
//                   [],
//                   [],
//                 ),
//                 [
//                   new SyntaxToken(
//                     TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                     { row: 1, column: 29, position: 28 },
//                     ",",
//                     [],
//                     [],
//                   ),
//                 ],
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                   { row: 1, column: 35, position: 34 },
//                   "}",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 23, position: 22 },
//                 ",",
//                 [],
//                 [],
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//             { row: 1, column: 18, position: 17 },
//             "{",
//             [],
//             [],
//           ),
//           undefined,
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//             { row: 1, column: 36, position: 35 },
//             "}",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_MAP_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "map",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 4, position: 3 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 12, position: 11 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 16, position: 15 },
//           ")",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 17, position: 16 },
//               " ",
//             ),
//           ],
//         ),
//       ),
//     );
//   });

//   test("Test map declaration pattern - escape codes", () => {
//     testSyntaxPattern(
//       MAP_DECLARATION_RULE,
//       "map offsets (int) {0b00,{int(6)}}",
//       new MapDeclaration(
//         new Identifier(
//           "offsets",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 5, position: 4 },
//             "offsets",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 12, position: 11 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         new ElementaryType(
//           ElementaryTypeKind.INTEGER,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_INT_TOKEN,
//             { row: 1, column: 14, position: 13 },
//             "int",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         new MapEntryList(
//           [
//             new MapEntry(
//               new NumberLiteral(
//                 NumberLiteralKind.BINARY,
//                 0,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_BINARY_TOKEN,
//                     { row: 1, column: 20, position: 19 },
//                     "0b00",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new AggregateMapOutputValue(
//                 [
//                   new SingleMapOutputValue(
//                     undefined,
//                     new ElementaryType(
//                       ElementaryTypeKind.INTEGER,
//                       undefined,
//                       new SyntaxToken(
//                         TokenKind.KEYWORD_INT_TOKEN,
//                         { row: 1, column: 26, position: 25 },
//                         "int",
//                         [],
//                         [],
//                       ),
//                     ),
//                     new LengthAttribute(
//                       new NumberLiteral(
//                         NumberLiteralKind.INTEGER,
//                         6,
//                         [
//                           new SyntaxToken(
//                             TokenKind.LITERAL_INTEGER_TOKEN,
//                             { row: 1, column: 30, position: 29 },
//                             "6",
//                             [],
//                             [],
//                           ),
//                         ],
//                       ),
//                       new SyntaxToken(
//                         TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//                         { row: 1, column: 29, position: 28 },
//                         "(",
//                         [],
//                         [],
//                       ),
//                       new SyntaxToken(
//                         TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//                         { row: 1, column: 31, position: 30 },
//                         ")",
//                         [],
//                         [],
//                       ),
//                     ),
//                   ),
//                 ],
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                   { row: 1, column: 25, position: 24 },
//                   "{",
//                   [],
//                   [],
//                 ),
//                 undefined,
//                 new SyntaxToken(
//                   TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                   { row: 1, column: 32, position: 31 },
//                   "}",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 24, position: 23 },
//                 ",",
//                 [],
//                 [],
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//             { row: 1, column: 19, position: 18 },
//             "{",
//             [],
//             [],
//           ),
//           undefined,
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//             { row: 1, column: 33, position: 32 },
//             "}",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_MAP_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "map",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 4, position: 3 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//           { row: 1, column: 13, position: 12 },
//           "(",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//           { row: 1, column: 17, position: 16 },
//           ")",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 18, position: 17 },
//               " ",
//             ),
//           ],
//         ),
//       ),
//     );
//   });
// });
