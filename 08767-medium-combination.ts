// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz']>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >
]

// ============= Your Code Here =============

type Filter<
  T extends readonly string[],
  F extends string
> = T extends readonly []
  ? []
  : T extends readonly [infer H, ...infer R extends string[]]
  ? H extends F
    ? Filter<R, F>
    : [H, ...Filter<R, F>]
  : never

type Combination<T extends string[]> = {
  [K in keyof T]:
    | T[K]
    | (T[K] extends string ? `${T[K]} ${Combination<Filter<T, T[K]>>}` : never)
}[number]
