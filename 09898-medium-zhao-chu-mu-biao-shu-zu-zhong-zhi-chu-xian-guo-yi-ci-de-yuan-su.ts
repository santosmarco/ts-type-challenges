// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]

// ============= Your Code Here =============

type IsEqual<T, U> = (<X>(x: X) => X extends T ? 1 : 0) extends <Y>(
  y: Y,
) => Y extends U ? 1 : 0
  ? 1
  : 0

type FilterOut<T extends readonly unknown[], U> = T extends readonly []
  ? T
  : T extends readonly [infer TFirst, ...infer TTail]
  ? IsEqual<TFirst, U> extends 1
    ? FilterOut<TTail, U>
    : [TFirst, ...FilterOut<TTail, U>]
  : never

type FindEles<T extends any[]> = T extends readonly []
  ? T
  : T extends readonly [infer TFirst, ...infer TTail]
  ? TFirst extends TTail[number]
    ? FindEles<FilterOut<TTail, TFirst>>
    : [TFirst, ...FindEles<TTail>]
  : never
