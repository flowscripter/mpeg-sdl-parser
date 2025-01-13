import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";
import Identifier from "./Identifier.ts";
import ParameterValueList from "./ParameterValueList.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class ClassDefinition extends AbstractStatement {
  constructor(
    public readonly isLegacy: boolean,
    public readonly classIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    public readonly semicolonToken: SyntaxToken,
  ) {
    super(
      NodeKind.CLASS_DEFINITION,
      legacyToken?.location ?? identifier.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDefinition(this);
  }
}

export default ClassDefinition;
