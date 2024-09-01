// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>
]

// ============= Your Code Here =============
// M => minuend, S => subtrahend

type _BuildTuple<
  T extends number,
  _Acc extends readonly unknown[] = []
> = _Acc['length'] extends T ? _Acc : _BuildTuple<T, [..._Acc, unknown]>

type _Subtract<
  M extends number,
  S extends number,
  _AccM extends readonly unknown[] = _BuildTuple<M>,
  _AccS extends readonly unknown[] = []
> = _AccS['length'] extends S
  ? _AccM['length']
  : _AccM extends readonly [infer _, ...infer TTail]
  ? _Subtract<M, S, TTail, [..._AccS, unknown]>
  : never
type Subtract<M extends number, S extends number> = _Subtract<
  M,
  S
> extends infer TRes extends number
  ? TRes
  : never
