// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [
    {
      Foo: string
    }
  ]
}

type cases = [Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>]

// ============= Your Code Here =============

type CapitalizeTuple<T> = T extends readonly []
  ? T
  : T extends readonly [infer H, ...infer R]
  ? [CapitalizeNestObjectKeys<H>, ...CapitalizeTuple<R>]
  : never

type CapitalizeNestObjectKeys<T> = {
  [K in keyof T as Capitalize<K & string>]: T[K] extends ReadonlyArray<unknown>
    ? CapitalizeTuple<T[K]>
    : CapitalizeNestObjectKeys<T[K]>
} extends infer X
  ? { [K in keyof X]: X[K] }
  : never
