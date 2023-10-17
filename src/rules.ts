// deno-fmt-ignore-file

import { alt, apply, kleft, kright, opt_sc, rep_sc, rule, seq, tok, Token, TokenError } from "../deps.ts";
import TokenKind from "./tokenizer/token_kind.ts";
import * as ast from "./abstract_syntax_tree/abstract_syntax_tree.ts";
import NodeKind from "./abstract_syntax_tree/node_kind.ts";
import StringVariableKind from "./abstract_syntax_tree/string_variable_kind.ts";
import StringLiteralKind from "./abstract_syntax_tree/string_literal_kind.ts";

/*
 * PARSER TO ABSTRACT SYNTAX TREE NODE FUNCTIONS
 */

function getComment(value: Token<TokenKind>): ast.Comment {

  let comment = value.text;

  if (!comment.startsWith('//')) {
    throw new TokenError(value.pos, `Missing comment start characters: ${comment}`);
  }

  comment = comment.substring(2).trim();

  return {
    kind: NodeKind.COMMENT,
    comment
  };
}

// function getNumberValue(value): ast.NumberValue {
//   return {
//     kind: NodeKind.NUMBER_VALUE,
//     numberKind: NumberKind,
//     valueAsString: string,
//     value: number
//   };
// }
//
// function getUnaryOperator(value): ast.UnaryOperator {
//   return {
//     kind: NodeKind.UNARY_OPERATOR
//   };
// }
//
// function getBinaryOperator(value): ast.BinaryOperator {
//   return {
//     kind: NodeKind.BINARY_OPERATOR
//   };
// }
//
// function getUnaryExpression(value): ast.UnaryExpression {
//   return {
//     kind: NodeKind.UNARY_EXPRESSION
//   };
// }
//
// function getIdentifier(value): ast.Identifier {
//   return {
//     kind: NodeKind.IDENTIFIER
//   };
// }
//
// function getAssignmentExpression(value): ast.AssignmentExpression {
//   return {
//     kind: NodeKind.ASSIGNMENT_EXPRESSION
//   };
// }
//
// function getClassMemberExpression(value): ast.ClassMemberExpression {
//   return {
//     kind: NodeKind.CLASS_MEMBER_EXPRESSION
//   };
// }
//
// function getLengthOfExpression(value): ast.LengthOfExpression {
//   return {
//     kind: NodeKind.LENGTH_OF_EXPRESSION
//   };
// }
//
// function getNonParsableVariableDefinition(value): ast.NonParsableVariableDefinition {
//   return {
//     kind: NodeKind.NON_PARSABLE_VARIABLE_DEFINITION
//   };
// }
//
// function getParsableVariableDefinition(value): ast.ParsableVariableDefinition {
//   return {
//     kind: NodeKind.PARSABLE_VARIABLE_DEFINITION
//   };
// }
//
// function getElementaryTypeVariableDefinition(value): ast.ElementaryTypeVariableDefinition {
// }
//
// function getParsableTypeMapOutput(value): ast.ParsableTypeMapOutput {
//   return {
//     kind: NodeKind.PARSABLE_TYPE_MAP_OUTPUT
//   };
// }
//
// function getMapDefinition(value): ast.MapDefinition {
//   return {
//     kind: NodeKind.MAP_DEFINITION
//   };
// }
//
// function getMapVariableDefinition(value): ast.MapVariableDefinition {
//   return {
//     kind: NodeKind.MAP_VARIABLE_DEFINITION
//   };
// }

function getStringLiteral(value: [
  undefined | Token<TokenKind>,
  Token<TokenKind>
]): ast.StringLiteral {

  const [ stringLiteralEncoding, stringLiteralToken ] = value;

  let stringLiteralKind;

  if (stringLiteralEncoding == undefined) {
    stringLiteralKind = StringLiteralKind.BASE64;
  }
  else {
    if (stringLiteralEncoding.kind === TokenKind.EncodingPrefixUtf8) {
      stringLiteralKind = StringLiteralKind.UTF8;
    }
    else if (stringLiteralEncoding.kind === TokenKind.EncodingPrefixUtf16) {
      stringLiteralKind = StringLiteralKind.UTF16;
    }
    else {
      throw new TokenError(stringLiteralEncoding.pos, `Unsupported token for StringLiteralKind: ${TokenKind[stringLiteralEncoding.kind]}`);
    }
  }

  // Remove wrapping double quotes and unescape any contained double quotes
  let stringValue = stringLiteralToken.text;

  if (stringValue[0] !== '"') {
    throw new TokenError(stringLiteralToken.pos, `Missing starting double quote in string literal: ${stringValue}`);
  }

  if (stringValue[stringValue.length - 1] !== '"') {
    throw new TokenError(stringLiteralToken.pos, `Missing ending double quote in string literal: ${stringValue}`);
  }

  stringValue = stringValue.substring(1, stringValue.length - 2);
  stringValue = stringValue.replace('\\"', '"');

  return {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind,
    value: stringValue
  };
}

function getStringVariableDefinition(value: [
    Token<TokenKind>,
    ast.Identifier,
    undefined | ast.StringLiteral
]): ast.StringVariableDefinition {
  const [ keywordToken, identifier, stringLiteral ] = value;

  let stringVariableKind: StringVariableKind;
  switch (keywordToken.kind) {
    case TokenKind.KeywordUtf8String:
      stringVariableKind = StringVariableKind.UTF8;
      break;
    case TokenKind.KeywordUtfString:
      stringVariableKind = StringVariableKind.UTF16;
      break;
    case TokenKind.KeywordUtf8List:
      stringVariableKind = StringVariableKind.UTF8_LIST;
      break;
    case TokenKind.KeywordBase64String:
      stringVariableKind = StringVariableKind.BASE64;
      break;
    default:
      throw new TokenError(keywordToken.pos, `Unsupported token for StringVariableKind: ${TokenKind[keywordToken.kind]}`);
  }

  return {
    kind: NodeKind.STRING_VARIABLE_DEFINITION,
    stringVariableKind,
    identifier,
    stringLiteral
  };
}

// function getClassIdSpecification(value): ast.ClassIdSpecification {
//   return {
//     kind: NodeKind.CLASS_ID_SPECIFICATION
//   };
// }
//
// function getClassDefinitionBitAttribute(value): ast.ClassDefinitionBitAttribute {
//   return {
//     kind: NodeKind.CLASS_DEFINITION_BIT_ATTRIBUTE
//   };
// }
//
// function getClassDefinitionParameter(value): ast.ClassDefinitionParameter {
//   return {
//     kind: NodeKind.CLASS_DEFINITION_PARAMETER
//   };
// }
//
// function getClassDefinition(value): ast.ClassDefinition {
//   return {
//     kind: NodeKind.CLASS_DEFINITION
//   };
// }
//
// function getClassVariableDefinition(value): ast.ClassVariableDefinition {
//   return {
//     kind: NodeKind.CLASS_VARIABLE_DEFINITION
//   };
// }
//
// function getElementaryTypeArrayItemType(value): ast.ElementaryTypeArrayItemType {
//   return {
//     kind: NodeKind.ELEMENTARY_TYPE_ARRAY_ITEM_TYPE
//   };
// }
//
// function getArrayVariableDefinition(value): ast.ArrayVariableDefinition {
//   return {
//     kind: NodeKind.ARRAY_VARIABLE_DEFINITION,
//   };
// }
//
// function getArrayDimension(value): ast.ArrayDimension {
//   return {
//     kind: NodeKind.ARRAY_DIMENSION,
//   };
// }
//
// function getCompoundStatement(value): ast.CompoundStatement {
//   return {
//     kind: NodeKind.COMPOUND_STATEMENT,
//   };
// }
//
// function getIfStatement(value): ast.IfStatement {
//   return {
//     kind: NodeKind.IF_STATEMENT,
//   };
// }
//
// function getSwitchStatement(value): ast.SwitchStatement {
//   return {
//     kind: NodeKind.SWITCH_STATEMENT,
//   };
// }
//
// function getForStatement(value): ast.ForStatement {
//   return {
//     kind: NodeKind.FOR_STATEMENT,
//   };
// }
//
// function getDoStatement(value): ast.DoStatement {
//   return {
//     kind: NodeKind.DO_STATEMENT,
//   };
// }
//
// function getWhileStatement(value): ast.WhileStatement {
//   return {
//     kind: NodeKind.WHILE_STATEMENT,
//   };
// }
//
// function getExpression(value): ast.Expression {
//   return {
//     kind: NodeKind.EXPRESSION
//   };
// }

function getDefinition(value: ast.Statement[]): ast.Definition {
  return {
    kind: NodeKind.DEFINITION,
    statements: value,
  };
}

/*
 * PARSER DECLARATIONS
 */

export const COMMENT_PARSER = rule<TokenKind, ast.Comment>();
export const NUMBER_PARSER = rule<TokenKind, ast.NumberValue>();
export const IDENTIFIER_PARSER = rule<TokenKind, ast.Identifier>();
export const ELEMENTARY_TYPE_VARIABLE_DEFINITION_PARSER = rule<TokenKind, ast.ElementaryTypeVariableDefinition>();
export const MAP_DEFINITION_PARSER = rule<TokenKind, ast.MapDefinition>();
export const MAP_VARIABLE_DEFINITION_PARSER = rule<TokenKind, ast.MapVariableDefinition>();
export const STRING_LITERAL_PARSER = rule<TokenKind, ast.StringLiteral>();
export const STRING_VARIABLE_DEFINITION_PARSER = rule<TokenKind, ast.StringVariableDefinition>();
export const CLASS_DEFINITION_PARSER = rule<TokenKind, ast.ClassDefinition>();
export const CLASS_VARIABLE_DEFINITION_PARSER = rule<TokenKind, ast.ClassVariableDefinition>();
export const ARRAY_DIMENSION_PARSER = rule<TokenKind, ast.ArrayDimension>();
export const ARRAY_VARIABLE_DEFINITION_PARSER = rule<TokenKind, ast.ArrayVariableDefinition>();
export const COMPOUND_STATEMENT_PARSER = rule<TokenKind, ast.CompoundStatement>();
export const IF_STATEMENT_PARSER = rule<TokenKind, ast.IfStatement>();
export const SWITCH_STATEMENT_PARSER = rule<TokenKind, ast.SwitchStatement>();
export const FOR_STATEMENT_PARSER = rule<TokenKind, ast.ForStatement>();
export const DO_STATEMENT_PARSER = rule<TokenKind, ast.DoStatement>();
export const WHILE_STATEMENT_PARSER = rule<TokenKind, ast.WhileStatement>();
export const EXPRESSION_PARSER = rule<TokenKind, ast.Expression>();
export const ASSIGNMENT_EXPRESSION_PARSER = rule<TokenKind, ast.AssignmentExpression>();
export const STATEMENT_PARSER = rule<TokenKind, ast.Statement>();
export const DEFINITION_PARSER = rule<TokenKind, ast.Definition>();


/*
 * PARSER PATTERNS
 */

COMMENT_PARSER.setPattern(
  apply(tok(TokenKind.Comment), getComment)
);

// IDENTIFIER_PARSER.setPattern(apply(tok(TokenKind.Identifier), getIdentifier));

STRING_LITERAL_PARSER.setPattern(
    apply(
        seq(
            opt_sc(
                alt(
                    tok(TokenKind.EncodingPrefixUtf8),
                    tok(TokenKind.EncodingPrefixUtf16),
                )
            ),
            tok(TokenKind.StringLiteral)
        ),
        getStringLiteral
    )
);

STRING_VARIABLE_DEFINITION_PARSER.setPattern(
    apply(
        seq(
            alt(
                tok(TokenKind.KeywordUtf8String),
                tok(TokenKind.KeywordUtfString),
                tok(TokenKind.KeywordUtf8List),
                tok(TokenKind.KeywordBase64String)
            ),
            IDENTIFIER_PARSER,
            kleft(
                opt_sc(
                    kright(
                        tok(TokenKind.OperatorAssignment),
                        STRING_LITERAL_PARSER
                    ),
                ),
                tok(TokenKind.PunctuatorSemicolon)
            )
        ),
        getStringVariableDefinition
    )
);

STATEMENT_PARSER.setPattern(
  alt(
    COMMENT_PARSER,
    // apply(ELEMENTARY_TYPE_VARIABLE_DEFINITION_PARSER, getElementaryTypeVariableDefinition),
    // apply(MAP_DEFINITION_PARSER, getMapDefinition),
    // apply(MAP_VARIABLE_DEFINITION_PARSER, getMapVariableDefinition),
    STRING_VARIABLE_DEFINITION_PARSER,
    // apply(CLASS_DEFINITION_PARSER, getClassDefinition),
    // apply(CLASS_VARIABLE_DEFINITION_PARSER, getClassVariableDefinition),
    // apply(ARRAY_VARIABLE_DEFINITION_PARSER, getArrayVariableDefinition),
    // apply(COMPOUND_STATEMENT_PARSER, getCompoundStatement),
    // apply(IF_STATEMENT_PARSER, getIfStatement),
    // apply(SWITCH_STATEMENT_PARSER, getSwitchStatement),
    // apply(FOR_STATEMENT_PARSER, getForStatement),
    // apply(DO_STATEMENT_PARSER, getDoStatement),
    // apply(WHILE_STATEMENT_PARSER, getWhileStatement),
    // apply(EXPRESSION_PARSER, getExpression),
    // apply(ASSIGNMENT_EXPRESSION_PARSER, getAssignmentExpression),
  ),
);

DEFINITION_PARSER.setPattern(apply(rep_sc(STATEMENT_PARSER), getDefinition));
