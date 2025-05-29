import type { Tree } from "@lezer/common";
import { Text } from "@codemirror/state";
import type SdlStringInput from "../lezer/SdlStringInput";
import type Specification from "./node/Specification";
import NodeFactory from "./factory/NodeFactory";

/**
 * Process the SDL parse tree and return an abstract syntax tree.
 *
 * @param parseTree The parse `Tree` generated from the SDL source.
 * @param sdlStringInput The SDL source text as an `SdlStringInput`.
 */
export function buildAst(
  parseTree: Tree,
  sdlStringInput: SdlStringInput,
): Specification {
  const text = Text.of(
    sdlStringInput.read(0, sdlStringInput.length).split("\n"),
  );
  const topSyntaxNode = parseTree.topNode;

  if (topSyntaxNode.type.name !== "Specification") {
    throw new Error(
      "Expected top node of parseTree to be of type Specification, it was: " +
        topSyntaxNode.type,
    );
  }

  return NodeFactory.createNode(topSyntaxNode, text) as Specification;
}
