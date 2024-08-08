// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>
  >,
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>
  >,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>
]

// ============= Your Code Here =============

type Rest<T extends readonly string[]> = T extends readonly []
  ? []
  : T extends readonly [infer _, ...infer TRest extends string[]]
  ? TRest
  : never

type FilterOut<T extends readonly unknown[], U> = T extends readonly []
  ? []
  : T extends readonly [infer THead, ...infer TRest]
  ? THead extends U
    ? FilterOut<TRest, U>
    : [THead, ...FilterOut<TRest, U>]
  : never

type FilterIn<T extends readonly unknown[], U> = T extends readonly []
  ? []
  : T extends readonly [infer THead, ...infer TRest]
  ? THead extends U
    ? [THead, ...FilterIn<TRest, U>]
    : FilterIn<TRest, U>
  : never

type Chunks<
  T extends string,
  U extends string
> = T extends `${infer TLeft}${U}${infer TRight}`
  ? [TLeft, U, ...Chunks<TRight, U>]
  : [T]

type StringLength<T extends string> = FilterOut<Chunks<T, ''>, ''>['length']

type Join<T extends readonly string[]> = T extends readonly []
  ? ''
  : T extends readonly [
      infer THead extends string,
      ...infer TRest extends string[]
    ]
  ? `${THead}${Join<TRest>}`
  : never

type Take<
  T extends string,
  N extends number,
  _TAcc extends readonly unknown[] = [],
  _TAccTemp extends readonly string[] = []
> = N extends 1
  ? FilterOut<Chunks<T, ''>, ''> extends infer U
    ? { [K in keyof U]: [U[K]] }
    : never
  : T extends ''
  ? _TAcc
  : T extends `${infer U}${infer TRest}`
  ? [..._TAccTemp, U]['length'] extends N
    ? Take<
        `${Join<Rest<_TAccTemp>>}${U}${TRest}`,
        N,
        [..._TAcc, [..._TAccTemp, U]],
        []
      >
    : Take<TRest, N, _TAcc, [..._TAccTemp, U]>
  : never

type FindAll<T extends string, P extends string> = Take<
  T,
  StringLength<P>
> extends infer U extends readonly (readonly string[])[]
  ? FilterIn<
      { [K in keyof U]: { idx: K; str: Join<U[K]> } },
      { str: P }
    > extends infer V extends ReadonlyArray<{ idx: `${number}` }>
    ? {
        [K in keyof V]: V[K]['idx'] extends `${infer TIdx extends number}`
          ? TIdx
          : never
      }
    : never
  : never
