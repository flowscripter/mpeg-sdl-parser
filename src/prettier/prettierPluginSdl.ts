import type { Parser, Plugin, Printer, SupportLanguage } from "prettier";
import printNode from "./print_node";
import type AbstractNode from "../ast/node/AbstractNode";
import { createStrictSdlParser } from "../lezer/createSdlParser";
import { buildAst } from "../ast/buildAst";
import SdlStringInput from "../lezer/SdlStringInput";
const languages: SupportLanguage[] = [
  {
    name: "sdl",
    parsers: ["sdl"],
  },
];

const parsers: Record<string, Parser<AbstractNode>> = {
  sdl: {
    astFormat: "sdl",
    parse: async (sdlSpecification) => {
      const sdlStringInput = new SdlStringInput(sdlSpecification);
      const sdlParser = await createStrictSdlParser();
      const parseTree = sdlParser.parse(sdlSpecification);

      return buildAst(parseTree, sdlStringInput);
    },
    locStart: (node: AbstractNode) => {
      return node.startToken.leadingTrivia.length > 0
        ? node.startToken.leadingTrivia[0].location.position
        : node.startToken.location.position;
    },
    locEnd: (node: AbstractNode) => {
      return node.endToken.trailingTrivia.length > 0
        ? node.endToken.trailingTrivia[node.endToken.trailingTrivia.length - 1]
          .location.position
        : node.endToken.location.position;
    },
  },
};

const printers: Record<string, Printer<AbstractNode>> = {
  "sdl": {
    print: printNode,
  },
};

const prettierPluginSdl: Plugin<AbstractNode> = {
  languages,
  parsers,
  printers,
};

export default prettierPluginSdl;
