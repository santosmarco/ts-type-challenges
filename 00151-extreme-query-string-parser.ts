// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<
    Equal<
      ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>,
      { k1: ['v1', 'v2', 'v3']; k2: 'v2' }
    >
  >
]

// ============= Your Code Here =============

type FilterDuplicates<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Rest]
  ? Head extends Rest[number]
    ? FilterDuplicates<Rest>
    : [Head, ...FilterDuplicates<Rest>]
  : never

type CastToSingle<T> = T extends [infer Element] ? Element : T

type _ParseQueryString<T extends string> = T extends ''
  ? {}
  : T extends `${infer Key}=${infer Rest}`
  ? Rest extends `${infer Value}&${infer Next}`
    ? _ParseQueryString<Next> extends infer X
      ? Key extends keyof X
        ? {
            [K in Key]: CastToSingle<
              FilterDuplicates<
                [Value, ...(X[Key] extends string[] ? X[Key] : [X[Key]])]
              >
            >
          } & Omit<_ParseQueryString<Next>, Key>
        : { [K in Key]: Value } & _ParseQueryString<Next>
      : never
    : { [K in Key]: Rest }
  : T extends `${infer Key}&${infer Next}`
  ? { [K in Key]: true } & _ParseQueryString<Next>
  : { [K in T]: true }

type ParseQueryString<T extends string> = _ParseQueryString<T> extends infer X
  ? { [K in keyof X]: X[K] }
  : never
