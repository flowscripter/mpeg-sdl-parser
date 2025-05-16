// import { describe, test } from "bun:test";
// import { ArrayElementAccess } from "../../../src/ast/node/ArrayElementAccess.ts";
// import { BinaryExpression } from "../../../src/ast/node/BinaryExpression.ts";
// import { ClassMemberAccess } from "../../../src/ast/node/ClassMemberAccess.ts";
// import { BinaryOperatorKind } from "../../../src/ast/node/enum/binary_operator_kind.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { PostfixExpression } from "../../../src/ast/node/PostfixExpression.ts";
// import { ASSIGNMENT_EXPRESSION_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("Assignment Expression Pattern Tests", () => {
//   test("Test assignment expression pattern", () => {
//     testSyntaxPattern(
//       ASSIGNMENT_EXPRESSION_RULE,
//       "i=1*2",
//       new BinaryExpression(
//         new Identifier(
//           "i",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             "i",
//             [],
//             [],
//           ),
//         ),
//         BinaryOperatorKind.ASSIGNMENT,
//         new BinaryExpression(
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             1,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 {
//                   row: 1,
//                   column: 3,
//                   position: 2,
//                 },
//                 "1",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           BinaryOperatorKind.MULTIPLY,
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             2,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 {
//                   row: 1,
//                   column: 5,
//                   position: 4,
//                 },
//                 "2",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_MULTIPLY_TOKEN,
//             {
//               row: 1,
//               column: 4,
//               position: 3,
//             },
//             "*",
//             [],
//             [],
//           ),
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           {
//             row: 1,
//             column: 2,
//             position: 1,
//           },
//           "=",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test assignment expression pattern - class member and array element access expressions", () => {
//     testSyntaxPattern(
//       ASSIGNMENT_EXPRESSION_RULE,
//       "a.b=c[1]",
//       new BinaryExpression(
//         new PostfixExpression(
//           new Identifier(
//             "a",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               {
//                 row: 1,
//                 column: 1,
//                 position: 0,
//               },
//               "a",
//               [],
//               [],
//             ),
//           ),
//           undefined,
//           new ClassMemberAccess(
//             new Identifier(
//               "b",
//               new SyntaxToken(
//                 TokenKind.IDENTIFIER_TOKEN,
//                 {
//                   row: 1,
//                   column: 3,
//                   position: 2,
//                 },
//                 "b",
//                 [],
//                 [],
//               ),
//             ),
//             new SyntaxToken(
//               TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
//               {
//                 row: 1,
//                 column: 2,
//                 position: 1,
//               },
//               ".",
//               [],
//               [],
//             ),
//           ),
//           undefined,
//           undefined,
//         ),
//         BinaryOperatorKind.ASSIGNMENT,
//         new PostfixExpression(
//           new Identifier(
//             "c",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               {
//                 row: 1,
//                 column: 5,
//                 position: 4,
//               },
//               "c",
//               [],
//               [],
//             ),
//           ),
//           new ArrayElementAccess(
//             new NumberLiteral(
//               NumberLiteralKind.INTEGER,
//               1,
//               [
//                 new SyntaxToken(
//                   TokenKind.LITERAL_INTEGER_TOKEN,
//                   {
//                     row: 1,
//                     column: 7,
//                     position: 6,
//                   },
//                   "1",
//                   [],
//                   [],
//                 ),
//               ],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
//               {
//                 row: 1,
//                 column: 6,
//                 position: 5,
//               },
//               "[",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
//               {
//                 row: 1,
//                 column: 8,
//                 position: 7,
//               },
//               "]",
//               [],
//               [],
//             ),
//           ),
//           undefined,
//           undefined,
//           undefined,
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           {
//             row: 1,
//             column: 4,
//             position: 3,
//           },
//           "=",
//           [],
//           [],
//         ),
//       ),
//     );
//   });
// });
