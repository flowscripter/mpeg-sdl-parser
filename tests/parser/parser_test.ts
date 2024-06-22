import { assertEquals } from "../test_deps.ts";
import { parse } from "../../src/parser/parser.ts";
import NodeKind from "../../src/abstract_syntax_tree/node_kind.ts";

Deno.test("Test Comment", () => {
  assertEquals(parse("// hello world"), {
    kind: NodeKind.DEFINITION,
    statements: [
      {
        kind: NodeKind.COMMENT_NODE,
        comment: "hello world",
      },
    ],
  });
});

// TODO: more tests!
