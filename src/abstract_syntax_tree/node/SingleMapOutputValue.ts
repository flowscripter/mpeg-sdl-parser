import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractMapOutputValue from "./AbstractMapOutputValue.ts";
import AbstractNode from "./AbstractNode.ts";
import ElementaryType from "./ElementaryType.ts";
import MapOutputValueKind from "./enum/map_output_value_kind.ts";
import LengthAttribute from "./LengthAttribute.ts";
import NumberLiteral from "./NumberLiteral.ts";

class SingleMapOutputValue extends AbstractMapOutputValue {
  constructor(
    public readonly numberLiteralValue: NumberLiteral | undefined,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly lengthAttribute: LengthAttribute | undefined,
  ) {
    super(
      MapOutputValueKind.AGGREGATE,
      numberLiteralValue?.location ?? elementaryType!.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.numberLiteralValue) {
      yield this.numberLiteralValue;
    } else if (this.elementaryType) {
      yield this.elementaryType;
    } else {
      yield this.lengthAttribute!;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.numberLiteralValue) {
      yield* this.numberLiteralValue.getSyntaxTokenIterable();
    } else if (this.elementaryType) {
      yield* this.elementaryType.getSyntaxTokenIterable();
    } else {
      yield* this.lengthAttribute!.getSyntaxTokenIterable();
    }
  }
}

export default SingleMapOutputValue;
