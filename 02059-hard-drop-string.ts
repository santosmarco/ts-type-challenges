// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
  >,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
]

// ============= Your Code Here =============

type Split<S> = S extends ''
  ? []
  : S extends `${infer L}${infer R}`
  ? [L, ...Split<R>]
  : never

type _DropString<S extends string, R extends string> = R extends ''
  ? S
  : S extends `${infer L}${R}${infer Right}`
  ? `${L}${_DropString<Right, R>}`
  : S

type IterateAndDrop<
  S extends string,
  R extends readonly string[]
> = R extends readonly []
  ? S
  : R extends readonly [
      infer H extends string,
      ...infer Rest extends readonly string[]
    ]
  ? IterateAndDrop<_DropString<S, H>, Rest>
  : never

type DropString<S extends string, R extends string> = IterateAndDrop<
  S,
  Split<R>
>
