import AbstractNode from "../../../src/abstract_syntax_tree/node/AbstractNode.ts";
import ClassDeclaration from "../../../src/abstract_syntax_tree/node/ClassDeclaration.ts";
import NodeKind from "../../../src/abstract_syntax_tree/node/enum/node_kind.ts";
import NodeVisitor from "../../../src/abstract_syntax_tree/visitor/NodeVisitor.ts";
import TraversingVisitor from "../../../src/abstract_syntax_tree/visitor/TraversingVisitor.ts";
import Parser from "../../../src/parser/Parser.ts";
import { assertEquals, path } from "../../test_deps.ts";

class VerbatimPrintingNodeVisitor implements NodeVisitor {
  nodeHistory: string[] = [];

  visitBefore(node: AbstractNode): boolean {
    this.nodeHistory.push(NodeKind[node.nodeKind]);

    return true;
  }

  visitAfter(_node: AbstractNode): boolean {
    return true;
  }
}

Deno.test("Test traversing visitor  specification", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const verbatimPrintingNodeVisitor = new VerbatimPrintingNodeVisitor();
  const traversingVisitor = new TraversingVisitor(verbatimPrintingNodeVisitor);

  parsedSpecification.accept(traversingVisitor);

  assertEquals(
    verbatimPrintingNodeVisitor.nodeHistory,
    [
      "SPECIFICATION",
      "STATEMENT",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "STATEMENT",
      "EXPRESSION",
      "EXPRESSION",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "EXPRESSION",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "STATEMENT",
      "STATEMENT",
      "IDENTIFIER",
      "IDENTIFIER",
      "STATEMENT",
      "EXPRESSION",
      "IDENTIFIER",
      "EXPRESSION",
      "EXPRESSION",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "EXPRESSION",
      "IDENTIFIER",
      "CLASS_MEMBER_ACCESS",
      "IDENTIFIER",
      "STATEMENT",
      "EXPRESSION",
      "EXPRESSION",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "EXPRESSION",
      "IDENTIFIER",
      "NUMBER_LITERAL",
      "STATEMENT",
      "STATEMENT",
      "ARRAY_ELEMENT_TYPE",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
      "ARRAY_DIMENSION",
      "IDENTIFIER",
    ],
  );
});

Deno.test("Test traversing visitor  child node", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const verbatimPrintingNodeVisitor = new VerbatimPrintingNodeVisitor();
  const traversingVisitor = new TraversingVisitor(verbatimPrintingNodeVisitor);

  (parsedSpecification.globals[0] as ClassDeclaration).statements[2].accept(
    traversingVisitor,
  );

  assertEquals(
    verbatimPrintingNodeVisitor.nodeHistory,
    [
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
    ],
  );
});
