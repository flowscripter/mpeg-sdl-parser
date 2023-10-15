import { alt, apply, rep_sc, rule } from "../deps.ts";
import * as ast from "./abstract_synatx_tree.ts";
import TokenKind from "./token_kind.ts";
import NodeKind from "./node_kind.ts";

function getElementaryTypeVariableDefinition(
  value,
): ast.ElementaryTypeVariableDefinition {
  return {};
}

function getMapDefinition(value): ast.MapDefinition {
  return {};
}

function getMapVariableDefinition(value): ast.MapVariableDefinition {
  return {};
}

function getStringVariableDefinition(value): ast.StringVariableDefinition {
  return {};
}

function getClassDefinitionn(value): ast.ClassDefinition {
  return {};
}

function getClassVariableDefinition(value): ast.ClassVariableDefinition {
  return {};
}

function getArrayVariableDefinition(value): ast.ArrayVariableDefinition {
  return {};
}

function getCompoundStatement(value): ast.CompoundStatement {
  return {};
}

function getIfStatement(value): ast.IfStatement {
  return {};
}

function getSwitchStatement(value): ast.SwitchStatement {
  return {};
}

function getForStatement(value): ast.ForStatement {
  return {};
}

function getDoStatement(value): ast.DoStatement {
  return {};
}

function getWhileStatement(value): ast.WhileStatement {
  return {};
}

function getExpression(value): ast.Expression {
  return {};
}

function getAssignmentExpression(value): ast.AssignmentExpression {
  return {
    kind: NodeKind.ASSIGNMENT_EXPRESSION,
  };
}

function getDefinition(value: ast.Statement[]): ast.Definition {
  return {
    kind: NodeKind.DEFINITION,
    statements: value,
  };
}

export const ELEMENTARY_TYPE_VARIABLE_DEFINITION_PARSER = rule<
  TokenKind,
  ast.ElementaryTypeVariableDefinition
>();
export const MAP_DEFINITION_PARSER = rule<TokenKind, ast.MapDefinition>();
export const MAP_VARIABLE_DEFINITION_PARSER = rule<
  TokenKind,
  ast.MapVariableDefinition
>();
export const STRING_VARIABLE_DEFINITION_PARSER = rule<
  TokenKind,
  ast.StringVariableDefinition
>();
export const CLASS_DEFINITION_PARSER = rule<TokenKind, ast.ClassDefinition>();
export const CLASS_VARIABLE_DEFINITION_PARSER = rule<
  TokenKind,
  ast.ClassVariableDefinition
>();
export const ARRAY_VARIABLE_DEFINITION_PARSER = rule<
  TokenKind,
  ast.ArrayVariableDefinition
>();
export const COMPOUND_STATEMENT_PARSER = rule<
  TokenKind,
  ast.CompoundStatement
>();
export const IF_STATEMENT_PARSER = rule<TokenKind, ast.IfStatement>();
export const SWITCH_STATEMENT_PARSER = rule<TokenKind, ast.SwitchStatement>();
export const FOR_STATEMENT_PARSER = rule<TokenKind, ast.ForStatement>();
export const DO_STATEMENT_PARSER = rule<TokenKind, ast.DoStatement>();
export const WHILE_STATEMENT_PARSER = rule<TokenKind, ast.WhileStatement>();
export const EXPRESSION_PARSER = rule<TokenKind, ast.Expression>();
export const ASSIGNMENT_EXPRESSION_PARSER = rule<
  TokenKind,
  ast.AssignmentExpression
>();
export const STATEMENT_PARSER = rule<TokenKind, ast.Statement>();
export const DEFINITION_PARSER = rule<TokenKind, ast.Definition>();

// alt is limited to 2-16 arguments, so nesting is required
STATEMENT_PARSER.setPattern(alt(
  alt(
    apply(
      ELEMENTARY_TYPE_VARIABLE_DEFINITION_PARSER,
      getElementaryTypeVariableDefinition,
    ),
    apply(MAP_DEFINITION_PARSER, getMapDefinition),
    apply(MAP_VARIABLE_DEFINITION_PARSER, getMapVariableDefinition),
    apply(STRING_VARIABLE_DEFINITION_PARSER, getStringVariableDefinition),
    apply(CLASS_DEFINITION_PARSER, getClassDefinitionn),
    apply(CLASS_VARIABLE_DEFINITION_PARSER, getClassVariableDefinition),
    apply(ARRAY_VARIABLE_DEFINITION_PARSER, getArrayVariableDefinition),
  ),
  alt(
    apply(COMPOUND_STATEMENT_PARSER, getCompoundStatement),
    apply(IF_STATEMENT_PARSER, getIfStatement),
    apply(SWITCH_STATEMENT_PARSER, getSwitchStatement),
    apply(FOR_STATEMENT_PARSER, getForStatement),
    apply(DO_STATEMENT_PARSER, getDoStatement),
    apply(WHILE_STATEMENT_PARSER, getWhileStatement),
  ),
  alt(
    apply(EXPRESSION_PARSER, getExpression),
    apply(ASSIGNMENT_EXPRESSION_PARSER, getAssignmentExpression),
  ),
));

DEFINITION_PARSER.setPattern(apply(rep_sc(STATEMENT_PARSER), getDefinition));
