import { assertEquals } from "../test_deps.ts";
import { parse } from "../../src/parser/parser.ts";
import Comment from "../../src/abstract_syntax_tree/node/Comment.ts";
import Specification from "../../src/abstract_syntax_tree/node/Specification.ts";

Deno.test("Test comment", () => {
  assertEquals(
    parse("// hello world"),
    new Specification(
      [
        new Comment({ row: 0, column: 0, position: 0 }, {
          row: 0,
          column: 3,
          position: 3,
        }, "hello world"),
      ],
    ),
  );
});

// TODO: more tests!
