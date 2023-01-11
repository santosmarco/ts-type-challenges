// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>
]

// ============= Your Code Here =============

type SplitChars<T extends string> = T extends ''
  ? []
  : T extends `${infer H}${infer R}`
  ? [H, ...SplitChars<R>]
  : never

type Only<T extends readonly string[], C extends string> = T extends readonly []
  ? []
  : T extends readonly [infer H, ...infer R extends string[]]
  ? H extends C
    ? [H, ...Only<R, C>]
    : Only<R, C>
  : never

type Iterate<
  T extends string,
  _Orig extends string = T,
  _Arr extends readonly unknown[] = []
> = T extends ''
  ? -1
  : T extends `${infer H}${infer R}`
  ? Only<SplitChars<_Orig>, H>['length'] extends 1
    ? _Arr['length']
    : Iterate<R, _Orig, [..._Arr, unknown]>
  : never

type FirstUniqueCharIndex<T extends string> = Iterate<T>
