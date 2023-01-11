// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>
]

// ============= Your Code Here =============

type StrDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type ToNum<T extends string> = T extends `${infer N extends number}` ? N : never

type Split<T extends string> = T extends ''
  ? []
  : T extends `${infer H}${infer R}`
  ? [H, ...Split<R>]
  : never

type Join<T extends readonly string[]> = T extends readonly []
  ? ''
  : T extends readonly [
      infer H extends string,
      ...infer R extends readonly string[]
    ]
  ? `${H}${Join<R>}`
  : never

type Reverse<T extends readonly string[]> = T extends readonly []
  ? []
  : T extends readonly [infer H, ...infer R extends readonly string[]]
  ? [...Reverse<R>, H]
  : never

type OpDigit<T extends string> = T extends StrDigit
  ? {
      '0': '9'
      '1': '0'
      '2': '1'
      '3': '2'
      '4': '3'
      '5': '4'
      '6': '5'
      '7': '6'
      '8': '7'
      '9': '8'
    }[T]
  : never

type Op<T extends readonly string[]> = T extends readonly [
  infer H extends string,
  ...infer R extends readonly string[]
]
  ? OpDigit<H> extends '9'
    ? [OpDigit<H>, ...Op<R>]
    : [OpDigit<H>, ...R]
  : never

type TrimLeadingZeroes<T extends string> = T extends `0${infer R}`
  ? R extends ''
    ? T
    : TrimLeadingZeroes<R>
  : T

type MinusOne<T extends number> = T extends 0
  ? -1
  : ToNum<TrimLeadingZeroes<Join<Reverse<Op<Reverse<Split<`${T}`>>>>>>>
