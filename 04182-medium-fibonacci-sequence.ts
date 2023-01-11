// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
]

// ============= Your Code Here =============

type Fibonacci<
  T extends number,
  Count extends readonly unknown[] = [unknown, unknown],
  T1 extends readonly unknown[] = [],
  T2 extends readonly unknown[] = [unknown]
> = T extends 1
  ? 1
  : Count['length'] extends T
  ? [...T1, ...T2]['length']
  : Fibonacci<T, [...Count, unknown], T2, [...T1, ...T2]>
