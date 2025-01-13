import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import StringVariableKind from "./enum/string_variable_kind.ts";
import Identifier from "./Identifier.ts";
import AlignedModifier from "./AlignedModifier.ts";
import StringLiteral from "./StringLiteral.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class StringDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly stringVariableKind: StringVariableKind,
    public readonly identifier: Identifier,
    public readonly stringLiteral: StringLiteral | undefined,
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    public readonly constToken: SyntaxToken | undefined,
    public readonly stringVariableKindToken: SyntaxToken,
    public readonly assignmentPunctuatorToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.STRING_DEFINITION,
      reservedToken?.location ??
        legacyToken?.location ??
        constToken?.location ??
        alignedModifier?.location ??
        stringVariableKindToken.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitStringDefinition(this);
  }
}

export default StringDefinition;
