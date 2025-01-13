import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractArrayDefinition from "./AbstractArrayDefinition.ts";
import AlignedModifier from "./AlignedModifier.ts";
import ArrayElementType from "./ArrayElementType.ts";
import NodeKind from "./enum/node_kind.ts";
import ExplicitArrayDimension from "./ExplicitArrayDimension.ts";
import Identifier from "./Identifier.ts";
import ImplicitArrayDimension from "./ImplicitArrayDimension.ts";
import PartialArrayDimension from "./PartialArrayDimension.ts";

class ArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly arrayElementType: ArrayElementType,
    identifier: Identifier,
    public readonly implicitArrayDimension: ImplicitArrayDimension | undefined,
    public readonly dimensions:
      | (ExplicitArrayDimension | PartialArrayDimension)[]
      | undefined,
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.ARRAY_DEFINITION,
      reservedToken?.location ?? legacyToken?.location ??
        alignedModifier?.location ??
        arrayElementType.location,
      identifier,
      semicolonPunctuatorToken,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitArrayDefinition(this);
  }
}

export default ArrayDefinition;
