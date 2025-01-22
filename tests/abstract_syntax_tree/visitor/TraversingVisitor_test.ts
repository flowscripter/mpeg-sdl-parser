import type AbstractCompositeNode from "../../../src/abstract_syntax_tree/node/AbstractCompositeNode.ts";
import type AbstractNode from "../../../src/abstract_syntax_tree/node/AbstractNode.ts";
import type ClassDeclaration from "../../../src/abstract_syntax_tree/node/ClassDeclaration.ts";
import NodeKind from "../../../src/abstract_syntax_tree/node/enum/node_kind.ts";
import dispatch from "../../../src/abstract_syntax_tree/visitor/dispatch.ts";
import type NodeVisitor from "../../../src/abstract_syntax_tree/visitor/NodeVisitor.ts";
import TraversingVisitor from "../../../src/abstract_syntax_tree/visitor/TraversingVisitor.ts";
import VisitResult from "../../../src/abstract_syntax_tree/visitor/visit_result.ts";
import Parser from "../../../src/parser/Parser.ts";
import { assertEquals, path } from "../../test_deps.ts";

class HistoryRecordingNodeVisitor implements NodeVisitor {
  nodeHistory: string[] = [];

  beforeVisit(node: AbstractCompositeNode): VisitResult {
    this.nodeHistory.push(NodeKind[node.nodeKind]);

    return VisitResult.CONTINUE;
  }

  visit(node: AbstractNode): VisitResult {
    this.nodeHistory.push(NodeKind[node.nodeKind]);

    return VisitResult.CONTINUE;
  }

  afterVisit(_node: AbstractCompositeNode): VisitResult {
    return VisitResult.CONTINUE;
  }
}

class IdentifierNodeVisitor extends HistoryRecordingNodeVisitor {
  override beforeVisit(_node: AbstractCompositeNode): VisitResult {
    return VisitResult.CONTINUE;
  }

  override visit(node: AbstractNode): VisitResult {
    if (node.nodeKind === NodeKind.IDENTIFIER) {
      return super.visit(node);
    }

    return VisitResult.CONTINUE;
  }

  override afterVisit(node: AbstractCompositeNode): VisitResult {
    return super.afterVisit(node);
  }
}

class FirstIdentifierNodeVisitor implements NodeVisitor {
  constructor(private readonly identifierNodeVisitor: IdentifierNodeVisitor) {}

  beforeVisit(node: AbstractCompositeNode): VisitResult {
    return this.identifierNodeVisitor.beforeVisit(node);
  }

  visit(node: AbstractNode): VisitResult {
    const result = this.identifierNodeVisitor.visit(node);

    if (node.nodeKind === NodeKind.IDENTIFIER) {
      return VisitResult.STOP;
    }

    return result;
  }

  afterVisit(node: AbstractCompositeNode): VisitResult {
    return this.identifierNodeVisitor.afterVisit(node);
  }

  get nodeHistory() {
    return this.identifierNodeVisitor.nodeHistory;
  }
}

Deno.test("Test traversing visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const traversingVisitor = new TraversingVisitor();

  traversingVisitor.visit(parsedSpecification);
});

Deno.test("Test traversing visitor - dispatch on full specification with operation visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const historyRecordingNodeProcessor = new HistoryRecordingNodeVisitor();

  dispatch(parsedSpecification, historyRecordingNodeProcessor);

  assertEquals(
    historyRecordingNodeProcessor.nodeHistory,
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

Deno.test("Test traversing visitor - dispatch on child node with operation visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const historyRecordingNodeProcessor = new HistoryRecordingNodeVisitor();

  dispatch(
    (parsedSpecification.globals[0] as ClassDeclaration).statements[2],
    historyRecordingNodeProcessor,
  );

  assertEquals(
    historyRecordingNodeProcessor.nodeHistory,
    [
      "STATEMENT",
      "ELEMENTARY_TYPE",
      "LENGTH_ATTRIBUTE",
      "NUMBER_LITERAL",
      "IDENTIFIER",
    ],
  );
});

Deno.test("Test traversing visitor - dispatch on full specification with filtering visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const identifierNodeVisitor = new IdentifierNodeVisitor();

  dispatch(parsedSpecification, identifierNodeVisitor);

  assertEquals(
    identifierNodeVisitor.nodeHistory,
    [
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
      "IDENTIFIER",
    ],
  );
});

Deno.test("Test traversing visitor - dispatch on full specification with early stop visitor", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../../sample_specifications/sample.sdl"),
  );
  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  const firstIdentifierNodeVisitor = new FirstIdentifierNodeVisitor(
    new IdentifierNodeVisitor(),
  );

  dispatch(parsedSpecification, firstIdentifierNodeVisitor);

  assertEquals(
    firstIdentifierNodeVisitor.nodeHistory,
    [
      "IDENTIFIER",
    ],
  );
});
