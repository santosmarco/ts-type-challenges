// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>
]

// ============= Your Code Here =============

type Reverse<T extends string> = T extends ''
  ? T
  : T extends `${infer TFirst}${infer TRest}`
  ? `${Reverse<TRest>}${TFirst}`
  : never

type PickFirst<T extends string> = T extends `${infer TFirst}${string}`
  ? TFirst
  : never

type IsOdd<T extends number> = number extends T
  ? false
  : PickFirst<Reverse<`${T}`>> extends '1' | '3' | '5' | '7' | '9'
  ? true
  : false
