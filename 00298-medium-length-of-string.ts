// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
]

// ============= Your Code Here =============

type LengthOfString<
  S extends string,
  _Acc extends unknown[] = []
> = S extends ''
  ? _Acc['length']
  : S extends `${string}${infer R}`
  ? LengthOfString<R, [..._Acc, unknown]>
  : never
