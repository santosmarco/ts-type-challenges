// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>
]

// ============= Your Code Here =============

type Greatest<
  T extends number,
  U extends number,
  Res extends readonly unknown[] = []
> = T extends Res['length']
  ? U extends Res['length']
    ? T
    : U
  : U extends Res['length']
  ? T
  : Greatest<T, U, [...Res, unknown]>

type Maximum<
  T extends readonly number[],
  Acc extends number = T[0]
> = T extends readonly []
  ? [Acc, undefined] extends [undefined, Acc]
    ? never
    : Acc
  : T extends readonly [
      infer H extends number,
      ...infer R extends readonly number[]
    ]
  ? Greatest<Acc, H> extends infer Res extends number
    ? Maximum<R, Res>
    : never
  : never
