// import { describe, expect, test } from "bun:test";
// import { StringLiteralKind } from "../../../src/ast/node/enum/string_literal_kind.ts";
// import { StringLiteral } from "../../../src/ast/node/StringLiteral.ts";
// import { STRING_LITERAL_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("String Literal Pattern Tests", () => {
//   test("Test string literal pattern", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       '"hello"',
//       new StringLiteral(
//         StringLiteralKind.BASIC,
//         "hello",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             '"hello"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - escaped double quote", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       '"hello \\"world\\""',
//       new StringLiteral(
//         StringLiteralKind.BASIC,
//         'hello "world"',
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             '"hello \\"world\\""',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - escaped backslash", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       '"hello \\\\world\\\\"',
//       new StringLiteral(
//         StringLiteralKind.BASIC,
//         "hello \\world\\",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             '"hello \\\\world\\\\"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - SDL compatible UCS characters", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       'u"hello πό"',
//       new StringLiteral(
//         StringLiteralKind.UTF,
//         "hello πό",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_UTF_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             'u"hello πό"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - short UCS code point escape sequence", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       'u"hello \\u1234"',
//       new StringLiteral(
//         StringLiteralKind.UTF,
//         "hello \u{1234}",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_UTF_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             'u"hello \\u1234"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - long UCS code point escape sequence", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       'u"hello \\U00001234"',
//       new StringLiteral(
//         StringLiteralKind.UTF,
//         "hello \u{1234}",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_UTF_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             'u"hello \\U00001234"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - ignore line break escape code in literal", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       '"hello\\n"',
//       new StringLiteral(
//         StringLiteralKind.BASIC,
//         "hello\\n",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             '"hello\\n"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - mix of concatenated types fails to parse", () => {
//     expect(() =>
//       testSyntaxPattern(
//         STRING_LITERAL_RULE,
//         '"hello" u"world"',
//         new StringLiteral(
//           StringLiteralKind.BASIC,
//           "hello\\n",
//           [
//             new SyntaxToken(
//               TokenKind.LITERAL_STRING_BASIC_TOKEN,
//               {
//                 row: 1,
//                 column: 1,
//                 position: 0,
//               },
//               '"hello\\n"',
//               [],
//               [],
//             ),
//           ],
//         ),
//       )
//     ).toThrow(
//       "SYNTACTIC ERROR: Unexpected UTF prefix",
//     );
//   });

//   test("Test string literal pattern - concatenated on same line", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       '"hello" " world"',
//       new StringLiteral(
//         StringLiteralKind.BASIC,
//         "hello world",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             '"hello"',
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 8,
//                   position: 7,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 9,
//               position: 8,
//             },
//             '" world"',
//             [],
//             [],
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test string literal pattern - concatenated across multiple lines", () => {
//     testSyntaxPattern(
//       STRING_LITERAL_RULE,
//       '"hello"\n\n" world"',
//       new StringLiteral(
//         StringLiteralKind.BASIC,
//         "hello world",
//         [
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             '"hello"',
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.LITERAL_STRING_BASIC_TOKEN,
//             {
//               row: 3,
//               column: 1,
//               position: 9,
//             },
//             '" world"',
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 8,
//                   position: 7,
//                 },
//                 "\n\n",
//               ),
//             ],
//             [],
//           ),
//         ],
//       ),
//     );
//   });
// });
