import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";
import AlignedModifier from "./AlignedModifier.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import BitModifier from "./BitModifier.ts";
import Identifier from "./Identifier.ts";
import ParameterList from "./ParameterList.ts";
import ExtendsModifier from "./ExtendsModifier.ts";
import ExpandableModifier from "./ExpandableModifier.ts";

class ClassDeclaration extends AbstractStatement {
  constructor(
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly expandableModifier: ExpandableModifier | undefined,
    public readonly isAbstract: boolean,
    public readonly identifier: Identifier,
    public readonly parameterList: ParameterList | undefined,
    public readonly extendsModifier: ExtendsModifier | undefined,
    public readonly bitModifier: BitModifier | undefined,
    public readonly statements: AbstractStatement[],
    public readonly abstractToken: SyntaxToken | undefined,
    public readonly classToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(
      NodeKind.CLASS_DECLARATION,
      alignedModifier?.location ?? expandableModifier?.location ??
        identifier.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDeclaration(this);
  }
}

export default ClassDeclaration;
