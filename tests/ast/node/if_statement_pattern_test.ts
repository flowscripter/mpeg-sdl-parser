// import { describe, test } from "bun:test";
// import { BinaryExpression } from "../../../src/ast/node/BinaryExpression.ts";
// import { CompoundStatement } from "../../../src/ast/node/CompoundStatement.ts";
// import { BinaryOperatorKind } from "../../../src/ast/node/enum/binary_operator_kind.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { PostfixOperatorKind } from "../../../src/ast/node/enum/postfix_operator_kind.ts";
// import { ExpressionStatement } from "../../../src/ast/node/ExpressionStatement.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { IfClause } from "../../../src/ast/node/IfClause.ts";
// import { IfStatement } from "../../../src/ast/node/IfStatement.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { PostfixExpression } from "../../../src/ast/node/PostfixExpression.ts";
// import { IF_STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("If Statement Pattern Tests", () => {
//   test("Test if statement pattern - with braces in clauses", () => {
//     testSyntaxPattern(
//       IF_STATEMENT_RULE,
//       "if(i==1){i++;}else if(i==2){i--;}else{j++;}",
//       new IfStatement(
//         [
//           new IfClause(
//             new BinaryExpression(
//               new Identifier(
//                 "i",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 4, position: 3 },
//                   "i",
//                   [],
//                   [],
//                 ),
//               ),
//               BinaryOperatorKind.EQUAL,
//               new NumberLiteral(
//                 NumberLiteralKind.INTEGER,
//                 1,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_INTEGER_TOKEN,
//                     { row: 1, column: 7, position: 6 },
//                     "1",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new SyntaxToken(
//                 TokenKind.OPERATOR_EQUAL_TOKEN,
//                 { row: 1, column: 5, position: 4 },
//                 "==",
//                 [],
//                 [],
//               ),
//             ),
//             new CompoundStatement(
//               [
//                 new ExpressionStatement(
//                   new PostfixExpression(
//                     new Identifier(
//                       "i",
//                       new SyntaxToken(
//                         TokenKind.IDENTIFIER_TOKEN,
//                         { row: 1, column: 10, position: 9 },
//                         "i",
//                         [],
//                         [],
//                       ),
//                     ),
//                     undefined,
//                     undefined,
//                     PostfixOperatorKind.POSTFIX_INCREMENT,
//                     new SyntaxToken(
//                       TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
//                       { row: 1, column: 11, position: 10 },
//                       "++",
//                       [],
//                       [],
//                     ),
//                   ),
//                   new SyntaxToken(
//                     TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                     { row: 1, column: 13, position: 12 },
//                     ";",
//                     [],
//                     [],
//                   ),
//                 ),
//               ],
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                 { row: 1, column: 9, position: 8 },
//                 "{",
//                 [],
//                 [],
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                 { row: 1, column: 14, position: 13 },
//                 "}",
//                 [],
//                 [],
//               ),
//             ),
//             new SyntaxToken(
//               TokenKind.KEYWORD_IF_TOKEN,
//               { row: 1, column: 1, position: 0 },
//               "if",
//               [],
//               [],
//             ),
//             undefined,
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//               { row: 1, column: 3, position: 2 },
//               "(",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//               { row: 1, column: 8, position: 7 },
//               ")",
//               [],
//               [],
//             ),
//           ),
//           new IfClause(
//             new BinaryExpression(
//               new Identifier(
//                 "i",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 23, position: 22 },
//                   "i",
//                   [],
//                   [],
//                 ),
//               ),
//               BinaryOperatorKind.EQUAL,
//               new NumberLiteral(
//                 NumberLiteralKind.INTEGER,
//                 2,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_INTEGER_TOKEN,
//                     { row: 1, column: 26, position: 25 },
//                     "2",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new SyntaxToken(
//                 TokenKind.OPERATOR_EQUAL_TOKEN,
//                 { row: 1, column: 24, position: 23 },
//                 "==",
//                 [],
//                 [],
//               ),
//             ),
//             new CompoundStatement(
//               [
//                 new ExpressionStatement(
//                   new PostfixExpression(
//                     new Identifier(
//                       "i",
//                       new SyntaxToken(
//                         TokenKind.IDENTIFIER_TOKEN,
//                         { row: 1, column: 29, position: 28 },
//                         "i",
//                         [],
//                         [],
//                       ),
//                     ),
//                     undefined,
//                     undefined,
//                     PostfixOperatorKind.POSTFIX_DECREMENT,
//                     new SyntaxToken(
//                       TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN,
//                       { row: 1, column: 30, position: 29 },
//                       "--",
//                       [],
//                       [],
//                     ),
//                   ),
//                   new SyntaxToken(
//                     TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                     { row: 1, column: 32, position: 31 },
//                     ";",
//                     [],
//                     [],
//                   ),
//                 ),
//               ],
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                 { row: 1, column: 28, position: 27 },
//                 "{",
//                 [],
//                 [],
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                 { row: 1, column: 33, position: 32 },
//                 "}",
//                 [],
//                 [],
//               ),
//             ),
//             new SyntaxToken(
//               TokenKind.KEYWORD_IF_TOKEN,
//               { row: 1, column: 20, position: 19 },
//               "if",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.KEYWORD_ELSE_TOKEN,
//               { row: 1, column: 15, position: 14 },
//               "else",
//               [],
//               [
//                 new Trivia(
//                   TokenKind.WHITESPACE_TOKEN,
//                   { row: 1, column: 19, position: 18 },
//                   " ",
//                 ),
//               ],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//               { row: 1, column: 22, position: 21 },
//               "(",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//               { row: 1, column: 27, position: 26 },
//               ")",
//               [],
//               [],
//             ),
//           ),
//           new IfClause(
//             undefined,
//             new CompoundStatement(
//               [
//                 new ExpressionStatement(
//                   new PostfixExpression(
//                     new Identifier(
//                       "j",
//                       new SyntaxToken(
//                         TokenKind.IDENTIFIER_TOKEN,
//                         { row: 1, column: 39, position: 38 },
//                         "j",
//                         [],
//                         [],
//                       ),
//                     ),
//                     undefined,
//                     undefined,
//                     PostfixOperatorKind.POSTFIX_INCREMENT,
//                     new SyntaxToken(
//                       TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
//                       { row: 1, column: 40, position: 39 },
//                       "++",
//                       [],
//                       [],
//                     ),
//                   ),
//                   new SyntaxToken(
//                     TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                     { row: 1, column: 42, position: 41 },
//                     ";",
//                     [],
//                     [],
//                   ),
//                 ),
//               ],
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//                 { row: 1, column: 38, position: 37 },
//                 "{",
//                 [],
//                 [],
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//                 { row: 1, column: 43, position: 42 },
//                 "}",
//                 [],
//                 [],
//               ),
//             ),
//             undefined,
//             new SyntaxToken(
//               TokenKind.KEYWORD_ELSE_TOKEN,
//               { row: 1, column: 34, position: 33 },
//               "else",
//               [],
//               [],
//             ),
//             undefined,
//             undefined,
//           ),
//         ],
//       ),
//     );
//   });

//   test("Test if statement pattern - no braces and no else if clause", () => {
//     testSyntaxPattern(
//       IF_STATEMENT_RULE,
//       "if(i==1)i++;else j++;",
//       new IfStatement(
//         [
//           new IfClause(
//             new BinaryExpression(
//               new Identifier(
//                 "i",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 4, position: 3 },
//                   "i",
//                   [],
//                   [],
//                 ),
//               ),
//               BinaryOperatorKind.EQUAL,
//               new NumberLiteral(
//                 NumberLiteralKind.INTEGER,
//                 1,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_INTEGER_TOKEN,
//                     { row: 1, column: 7, position: 6 },
//                     "1",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new SyntaxToken(
//                 TokenKind.OPERATOR_EQUAL_TOKEN,
//                 { row: 1, column: 5, position: 4 },
//                 "==",
//                 [],
//                 [],
//               ),
//             ),
//             new ExpressionStatement(
//               new PostfixExpression(
//                 new Identifier(
//                   "i",
//                   new SyntaxToken(
//                     TokenKind.IDENTIFIER_TOKEN,
//                     { row: 1, column: 9, position: 8 },
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
//                   { row: 1, column: 10, position: 9 },
//                   "++",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                 { row: 1, column: 12, position: 11 },
//                 ";",
//                 [],
//                 [],
//               ),
//             ),
//             new SyntaxToken(
//               TokenKind.KEYWORD_IF_TOKEN,
//               { row: 1, column: 1, position: 0 },
//               "if",
//               [],
//               [],
//             ),
//             undefined,
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//               { row: 1, column: 3, position: 2 },
//               "(",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//               { row: 1, column: 8, position: 7 },
//               ")",
//               [],
//               [],
//             ),
//           ),
//           new IfClause(
//             undefined,
//             new ExpressionStatement(
//               new PostfixExpression(
//                 new Identifier(
//                   "j",
//                   new SyntaxToken(
//                     TokenKind.IDENTIFIER_TOKEN,
//                     { row: 1, column: 18, position: 17 },
//                     "j",
//                     [],
//                     [],
//                   ),
//                 ),
//                 undefined,
//                 undefined,
//                 PostfixOperatorKind.POSTFIX_INCREMENT,
//                 new SyntaxToken(
//                   TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
//                   { row: 1, column: 19, position: 18 },
//                   "++",
//                   [],
//                   [],
//                 ),
//               ),
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//                 { row: 1, column: 21, position: 20 },
//                 ";",
//                 [],
//                 [],
//               ),
//             ),
//             undefined,
//             new SyntaxToken(
//               TokenKind.KEYWORD_ELSE_TOKEN,
//               { row: 1, column: 13, position: 12 },
//               "else",
//               [],
//               [
//                 new Trivia(
//                   TokenKind.WHITESPACE_TOKEN,
//                   { row: 1, column: 17, position: 16 },
//                   " ",
//                 ),
//               ],
//             ),
//             undefined,
//             undefined,
//           ),
//         ],
//       ),
//     );
//   });
// });
