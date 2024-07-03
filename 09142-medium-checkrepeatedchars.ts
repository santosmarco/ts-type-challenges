// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>
]

// ============= Your Code Here =============

type CheckRepeatedChars<
  T extends string,
  _TAcc extends string = never
> = T extends ''
  ? false
  : T extends `${infer TFirst}${infer TRest}`
  ? TFirst extends _TAcc
    ? true
    : CheckRepeatedChars<TRest, _TAcc | TFirst>
  : never
