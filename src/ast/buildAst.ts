import type { Tree } from "@lezer/common";
import type SdlStringInput from "../lezer/SdlStringInput";
import type { Specification } from "./node/Specification";

/**
 * Process the SDL parse tree and return an abstract syntax tree.
 *
 * @param parseTree The parse `Tree` generated from the SDL source.
 * @param sdlSource The SDL source `StringInput`.
 */
export function buildAst(
  _parseTree: Tree,
  _sdlSource: SdlStringInput,
): Specification {
  return {} as Specification;
}
