import { apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import IfClause from "../../abstract_syntax_tree/node/IfClause.ts";
import IfStatement from "../../abstract_syntax_tree/node/IfStatement.ts";
import {
  ELSE_CLAUSE_RULE,
  ELSE_IF_CLAUSE_RULE,
  IF_CLAUSE_RULE,
} from "../syntax_rules.ts";

function getIfStatement(
  values: [
    IfClause,
    IfClause[],
    IfClause | undefined,
  ],
): IfStatement {
  const [ifClause, elseIfClauses, elseClause] = values;

  const ifClauses = [ifClause];

  if (elseIfClauses.length > 0) {
    ifClauses.push(...elseIfClauses);
  }

  if (elseClause) {
    ifClauses.push(elseClause);
  }
  return new IfStatement(
    ifClauses,
  );
}

function getIfStatementPattern() {
  return apply(
    seq(
      IF_CLAUSE_RULE,
      rep_sc(
        ELSE_IF_CLAUSE_RULE,
      ),
      opt_sc(
        ELSE_CLAUSE_RULE,
      ),
    ),
    getIfStatement,
  );
}

export default getIfStatementPattern;
