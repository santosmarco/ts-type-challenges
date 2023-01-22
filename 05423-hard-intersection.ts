// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>
]

// ============= Your Code Here =============

type UnionToIntersectionFn<T> = (
  T extends unknown ? (k: () => T) => void : never
) extends (k: infer Intersection) => void
  ? Intersection
  : never

type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last
  ? Last
  : never

type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never]
  ? Tuple
  : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>

type MapUnionsToTuple<T extends readonly unknown[]> = T extends readonly []
  ? []
  : T extends readonly [infer H, ...infer R]
  ? [
      UnionToTuple<H> extends infer U extends readonly [readonly unknown[]]
        ? U[0]
        : UnionToTuple<H>,
      ...MapUnionsToTuple<R>
    ]
  : never

type HasInEvery<T, U extends readonly (readonly unknown[])[]> = 0 extends {
  [K in keyof U]: T extends U[K][number] ? 1 : 0
}[number]
  ? 0
  : 1

type _Intersection<
  T extends readonly (readonly unknown[])[],
  Original extends readonly (readonly unknown[])[] = T
> = T extends readonly []
  ? never
  : T extends readonly [
      infer H extends readonly unknown[],
      ...infer R extends readonly (readonly unknown[])[]
    ]
  ?
      | {
          [K in keyof H]: HasInEvery<H[K], Original> extends 0 ? never : H[K]
        }[number]
      | _Intersection<R, Original>
  : never

type Intersection<T extends readonly unknown[]> = _Intersection<
  MapUnionsToTuple<T>
>
