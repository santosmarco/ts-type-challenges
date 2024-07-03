// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1
        2: 1
        3: 1
        4: 1
        5: 1
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2
        2: 2
        3: 2
        4: 1
        5: 1
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3
        2: 3
        3: 2
        4: 3
        5: 1
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1
        1: 1
        2: 1
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1
        b: 1
        c: 1
        d: 1
      }
    >
  >
]

// ============= Your Code Here =============

type Flatten<T> = T extends readonly []
  ? T
  : T extends readonly [infer THead, ...infer TRest]
  ? THead extends readonly unknown[]
    ? [...Flatten<THead>, ...Flatten<TRest>]
    : [THead, ...Flatten<TRest>]
  : never

type FilterIn<T, U> = T extends readonly []
  ? T
  : T extends readonly [infer THead, ...infer TRest]
  ? Equal<THead, U> extends true
    ? [THead, ...FilterIn<TRest, U>]
    : FilterIn<TRest, U>
  : never
type FilterOut<T, U> = T extends readonly []
  ? T
  : T extends readonly [infer THead, ...infer TRest]
  ? Equal<THead, U> extends true
    ? FilterOut<TRest, U>
    : [THead, ...FilterOut<TRest, U>]
  : never

type __CountElementNumberToObject<T> = T extends readonly []
  ? unknown
  : T extends readonly [infer THead extends PropertyKey, ...infer TRest]
  ? Record<THead, FilterIn<T, THead>['length']> &
      __CountElementNumberToObject<FilterOut<TRest, THead>>
  : {}
type _CountElementNumberToObject<T> =
  __CountElementNumberToObject<T> extends infer X
    ? { [K in keyof X]: X[K] }
    : never
type CountElementNumberToObject<T> = _CountElementNumberToObject<
  Flatten<FilterOut<T, never>>
>
