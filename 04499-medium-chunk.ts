// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
]

// ============= Your Code Here =============

type Chunk<
  T extends readonly unknown[],
  N extends number,
  Curr extends readonly unknown[] = [],
  Res extends readonly (readonly unknown[])[] = []
> = T extends []
  ? [Curr, Res] extends [[], []]
    ? []
    : [...Res, Curr]
  : T extends [infer H, ...infer R]
  ? Curr['length'] extends N
    ? Chunk<R, N, [H], [...Res, Curr]>
    : Chunk<R, N, [...Curr, H], Res>
  : never
