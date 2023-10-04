// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]

// ============= Your Code Here =============

type Reverse<T extends string> = T extends ''
  ? ''
  : T extends `${infer L}${infer R}`
  ? `${Reverse<R>}${L}`
  : never

type IsPalindrome<T extends string | number> = [
  `${T}`,
  Reverse<`${T}`>,
] extends [Reverse<`${T}`>, `${T}`]
  ? true
  : false
