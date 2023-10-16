enum TokenKind {
  Whitespace,
  Comment,
  ValueBinary,
  ValueHexadecimal,
  ValuePositiveInteger,
  ValueInteger,
  ValueFloat,
  StringLiteral,
  EncodingPrefixUtf8,
  EncodingPrefixUtf16,
  OperatorPostfixIncrement,
  OperatorPostfixDecrement,
  OperatorMultiply,
  OperatorDivide,
  OperatorModulus,
  OperatorAdd,
  OperatorSubtract,
  OperatorShiftLeft,
  OperatorShiftRight,
  OperatorLessThan,
  OperatorLessThanOrEqual,
  OperatorGreaterThan,
  OperatorGreaterThanOrEqual,
  OperatorEqual,
  OperatorNotEqual,
  OperatorBinaryAnd,
  OperatorBinaryOr,
  OperatorLogicalAnd,
  OperatorLogicalOr,
  OperatorRange,
  OperatorClassMemberAccess,
  OperatorAssignment,
  PunctuatorOpenParenthesis,
  PunctuatorCloseParenthesis,
  PunctuatorOpenBrace,
  PunctuatorCloseBrace,
  PunctuatorOpenBracket,
  PunctuatorCloseBracket,
  PunctuatorColon,
  PunctuatorSemicolon,
  PunctuatorComma,
  KeywordAbstract,
  KeywordAligned,
  KeywordBase64String,
  KeywordBit,
  KeywordBreak,
  KeywordCase,
  KeywordClass,
  KeywordConst,
  KeywordDefault,
  KeywordDo,
  KeywordElse,
  KeywordExpandable,
  KeywordExtends,
  KeywordFloat,
  KeywordFor,
  KeywordIf,
  KeywordInt,
  KeywordLengthof,
  KeywordMap,
  KeywordSwitch,
  KeywordType,
  KeywordUnsigned,
  KeywordUtf8String,
  KeywordUtf8List,
  KeywordUtfString,
  KeywordWhile,
  Identifier,
}

export default TokenKind;