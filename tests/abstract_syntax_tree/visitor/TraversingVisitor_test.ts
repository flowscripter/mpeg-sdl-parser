import AbstractNode from "../../../src/abstract_syntax_tree/node/AbstractNode.ts";
import NodeCallback from "../../../src/abstract_syntax_tree/visitor/NodeCallback.ts";
import TraversingVisitor from "../../../src/abstract_syntax_tree/visitor/TraversingVisitor.ts";
import Parser from "../../../src/parser/Parser.ts";
import { assertEquals, path } from "../../test_deps.ts";

// TODO: fix this
class VerbatimPrintingNodeCallback implements NodeCallback<string> {

  public printedSpecification: string = "";

  beforeVisit(node: AbstractNode, context: string): void {

  }

  afterVisit(node: AbstractNode, context: string): void {

  }
}

Deno.test("Test traversing visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);

  const verbatimPrintingNodeCallback = new VerbatimPrintingNodeCallback();
  const traversingVisitor = new TraversingVisitor(verbatimPrintingNodeCallback);

  traversingVisitor.visitSpecification(parsedSpecification);

  const reproducedSampleSdlSpecification = verbatimPrintingNodeCallback.printedSpecification;

  assertEquals(
    reproducedSampleSdlSpecification,
    originalSampleSdlSpecification,
  );
});
