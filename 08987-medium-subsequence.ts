// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
]

// ============= Your Code Here =============

type Subsequence<T extends any[]> = T extends readonly []
  ? []
  : T extends readonly [infer H, ...infer R]
  ? [H] | [H, ...Subsequence<R>] | Subsequence<R>
  : never
