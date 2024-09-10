// deno-fmt-ignore-file

import {alt, apply, kleft, lrec_sc, kmid, kright, opt_sc, rep_sc, rule, seq, tok} from "../../deps.ts";
import Alignment from "../abstract_syntax_tree/node/Alignment.ts";
import AssignmentExpression from "../abstract_syntax_tree/node/AssignmentExpression.ts";
import Comment from "../abstract_syntax_tree/node/Comment.ts";
import CompoundStatement from "../abstract_syntax_tree/node/CompoundStatement.ts";
import Expression from "../abstract_syntax_tree/node/Expression.ts";
import ExpressionStatement from "../abstract_syntax_tree/node/ExpressionStatement.ts";
import Identifier from "../abstract_syntax_tree/node/Identifier.ts";
import LengthOfExpression from "../abstract_syntax_tree/node/LengthOfExpression.ts";
import NumberLiteral from "../abstract_syntax_tree/node/NumberLiteral.ts";
import Specification from "../abstract_syntax_tree/node/Specification.ts";
import Statement from "../abstract_syntax_tree/node/Statement.ts";
import StringDefinition from "../abstract_syntax_tree/node/StringDefinition.ts";
import StringLiteral from "../abstract_syntax_tree/node/StringLiteral.ts";
import TokenKind from "../tokenizer/enum/token_kind.ts";
import * as astMappings from "./ast_mappings.ts";

export const COMMENT_RULE = rule<TokenKind, Comment>();
export const IDENTIFIER_RULE = rule<TokenKind, Identifier>();
export const UNARY_EXPRESSION_RULE = rule<TokenKind, Expression>();
export const BINARY_EXPRESSION_RULE = rule<TokenKind, Expression>();
export const ASSIGNMENT_EXPRESSION_RULE = rule<TokenKind, AssignmentExpression>();
export const EXPRESSION_STATEMENT_RULE = rule<TokenKind, ExpressionStatement>();
export const COMPOUND_STATEMENT_RULE = rule<TokenKind, CompoundStatement>();
export const LENGTHOF_EXPRESSION_RULE = rule<TokenKind, LengthOfExpression>();
export const NUMBER_LITERAL_RULE = rule<TokenKind, NumberLiteral>();
export const STRING_LITERAL_RULE = rule<TokenKind, StringLiteral>();
export const ALIGNMENT_RULE = rule<TokenKind, Alignment>();
export const STRING_DEFINITION_RULE = rule<TokenKind, StringDefinition>();
export const STATEMENT_RULE = rule<TokenKind, Statement>();
export const SPECIFICATION_RULE = rule<TokenKind, Specification>();

COMMENT_RULE.setPattern(apply(tok(TokenKind.COMMENT_TOKEN), astMappings.getComment));

IDENTIFIER_RULE.setPattern(apply(tok(TokenKind.IDENTIFIER_TOKEN), astMappings.getIdentifier));

UNARY_EXPRESSION_RULE.setPattern(
    apply(
        seq(
            opt_sc(
                alt(
                    tok(TokenKind.OPERATOR_PLUS_TOKEN),
                    tok(TokenKind.OPERATOR_MINUS_TOKEN)
                )
            ),
            alt(
              IDENTIFIER_RULE,
              NUMBER_LITERAL_RULE,
              LENGTHOF_EXPRESSION_RULE,
              // TODO: enable below
              // CLASS_MEMBER_ACCESS_EXPRESSION_RULE,
              // ARRAY_ELEMENT_ACCESS_EXPRESSION_RULE,
              seq(
                  tok(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
                  BINARY_EXPRESSION_RULE,
                  tok(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN)
              )
            ),
            opt_sc(
                alt(
                    tok(TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN),
                    tok(TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN)
                )
            )
        ),
        astMappings.getUnaryExpression
    )
);

BINARY_EXPRESSION_RULE.setPattern(
    lrec_sc(
        UNARY_EXPRESSION_RULE,
        seq(
            alt(
                alt(
                    tok(TokenKind.OPERATOR_MULTIPLY_TOKEN),
                    tok(TokenKind.OPERATOR_DIVIDE_TOKEN),
                    tok(TokenKind.OPERATOR_MODULUS_TOKEN),
                    tok(TokenKind.OPERATOR_PLUS_TOKEN),
                    tok(TokenKind.OPERATOR_MINUS_TOKEN),
                    tok(TokenKind.OPERATOR_SHIFT_LEFT_TOKEN),
                    tok(TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN),
                    tok(TokenKind.OPERATOR_LESS_THAN_TOKEN),
                    tok(TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN),
                    tok(TokenKind.OPERATOR_GREATER_THAN_TOKEN),
                    tok(TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN)
                ),
                alt(
                    tok(TokenKind.OPERATOR_EQUAL_TOKEN),
                    tok(TokenKind.OPERATOR_NOT_EQUAL_TOKEN),
                    tok(TokenKind.OPERATOR_BINARY_AND_TOKEN),
                    tok(TokenKind.OPERATOR_BINARY_OR_TOKEN),
                    tok(TokenKind.OPERATOR_LOGICAL_AND_TOKEN),
                    tok(TokenKind.OPERATOR_LOGICAL_OR_TOKEN)
                )
            ),
            UNARY_EXPRESSION_RULE
        ),
        astMappings.getBinaryExpression
    )
)

ASSIGNMENT_EXPRESSION_RULE.setPattern(
    apply(
        seq(
            // TODO: enable below
            // alt(
            IDENTIFIER_RULE,
                // class_member_access_expression
                // array_element_access_expression
            // ),
            tok(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
            BINARY_EXPRESSION_RULE
        ),
        astMappings.getAssignmentExpression
    )
)

EXPRESSION_STATEMENT_RULE.setPattern(
    apply(
        seq(
            alt(
                ASSIGNMENT_EXPRESSION_RULE,
                BINARY_EXPRESSION_RULE
            ),
            tok(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN)
        ),
        astMappings.getExpressionStatement
    )
)

COMPOUND_STATEMENT_RULE.setPattern(
    apply(
        seq(
            tok(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
            rep_sc(
                STATEMENT_RULE
            ),
            tok(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN)
        ),
        astMappings.getCompoundStatement
    )
)

LENGTHOF_EXPRESSION_RULE.setPattern(
    apply(
        seq(
            tok(TokenKind.KEYWORD_LENGTHOF_TOKEN),
            tok(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
            // TODO: enable below
            // alt(
                IDENTIFIER_RULE,
                // CLASS_MEMBER_ACCESS_EXPRESSION_RULE,
                // ARRAY_ELEMENT_ACCESS_EXPRESSION_RULE
            // ),
            tok(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN)
        ),
        astMappings.getLengthofExpression
    )
);

NUMBER_LITERAL_RULE.setPattern(
    apply(
        alt(
            tok(TokenKind.LITERAL_BINARY_TOKEN),
            tok(TokenKind.LITERAL_HEXADECIMAL_TOKEN),
            tok(TokenKind.LITERAL_INTEGER_TOKEN),
            tok(TokenKind.LITERAL_DECIMAL_TOKEN),
            tok(TokenKind.LITERAL_FLOATING_POINT_TOKEN)
        ),
        astMappings.getNumberLiteral,
    )
);

STRING_LITERAL_RULE.setPattern(
    apply(
        alt(
            tok(TokenKind.LITERAL_STRING_BASIC_TOKEN),
            tok(TokenKind.LITERAL_STRING_UTF8_TOKEN),
            tok(TokenKind.LITERAL_STRING_UTF16_TOKEN)
        ),
        astMappings.getStringLiteral
    )
);

ALIGNMENT_RULE.setPattern(
    apply(
        seq(
            tok(TokenKind.KEYWORD_ALIGNED_TOKEN),
            opt_sc(
                tok(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN)
            ),
            opt_sc(
                tok(TokenKind.LITERAL_INTEGER_TOKEN)
            ),
            opt_sc(
                tok(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN)
            )
        ),
        astMappings.getAlignment
    )
);

STRING_DEFINITION_RULE.setPattern(
    apply(
        seq(
            opt_sc(
                tok(TokenKind.KEYWORD_CONST_TOKEN)
            ),
            opt_sc(
                ALIGNMENT_RULE
            ),
            alt(
                tok(TokenKind.KEYWORD_UTF8STRING_TOKEN),
                tok(TokenKind.KEYWORD_UTFSTRING_TOKEN),
                tok(TokenKind.KEYWORD_UTF8LIST_TOKEN),
                tok(TokenKind.KEYWORD_BASE64STRING_TOKEN)
            ),
            IDENTIFIER_RULE,
            opt_sc(
                kright(
                    tok(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
                    STRING_LITERAL_RULE,
                ),
            ),
            tok(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN)
        ),
        astMappings.getStringDefinition
    )
);

STATEMENT_RULE.setPattern(
    alt(
        COMMENT_RULE,
        STRING_DEFINITION_RULE,
        COMPOUND_STATEMENT_RULE,
        EXPRESSION_STATEMENT_RULE,
        // COMMENTED_STATEMENT_RULE
        // TODO: implement
        // apply(ELEMENTARY_TYPE_VARIABLE_DEFINITION_PARSER, getElementaryTypeVariableDefinition),
        // apply(MAP_DEFINITION_PARSER, getMapDefinition),
        // apply(MAP_VARIABLE_DEFINITION_PARSER, getMapVariableDefinition),
        // apply(CLASS_DEFINITION_PARSER, getClassDefinition),
        // apply(CLASS_VARIABLE_DEFINITION_PARSER, getClassVariableDefinition),
        // apply(ARRAY_VARIABLE_DEFINITION_PARSER, getArrayVariableDefinition),
        // apply(IF_STATEMENT_PARSER, getIfStatement),
        // apply(SWITCH_STATEMENT_PARSER, getSwitchStatement),
        // apply(FOR_STATEMENT_PARSER, getForStatement),
        // apply(DO_STATEMENT_PARSER, getDoStatement),
        // apply(WHILE_STATEMENT_PARSER, getWhileStatement),
    )
);

SPECIFICATION_RULE.setPattern(
    apply(
        rep_sc(
        // TODO: implement
        // alt(
            COMMENT_RULE
        // )
        ),
        astMappings.getSpecification
    )
);
