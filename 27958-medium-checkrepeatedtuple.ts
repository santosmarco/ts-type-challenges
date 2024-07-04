// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>
]

// ============= Your Code Here =============

type CheckRepeatedTuple<T extends unknown[]> = number extends T['length']
  ? false
  : T extends readonly []
  ? false
  : T extends readonly [infer THead, ...infer TRest]
  ? THead extends TRest[number]
    ? true
    : CheckRepeatedTuple<TRest>
  : never
