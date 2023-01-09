// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>
]

// ============= Your Code Here =============

type Race<
  A extends number,
  B extends number,
  T extends readonly unknown[] = [],
  U extends readonly unknown[] = []
> = U extends { readonly length: infer UL extends B }
  ? UL extends A
    ? false
    : true
  : T extends { readonly length: infer TL extends A }
  ? false
  : Race<A, B, [...T, unknown], [...U, unknown]>

type GreaterThan<T extends number, U extends number> = Race<T, U>
