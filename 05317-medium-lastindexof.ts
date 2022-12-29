// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>
]

// ============= Your Code Here =============

type Equals<A, B> = (<X>() => X extends A ? true : false) extends <
  Y
>() => Y extends B ? true : false
  ? true
  : false

type Pop<T> = T extends [] ? [] : T extends [...infer H, unknown] ? H : never

type Reverse<T> = T extends []
  ? T
  : T extends [...infer H, infer L]
  ? [L, ...Reverse<H>]
  : never

type _LastIndexOf<
  T extends unknown[],
  U,
  _IdxTuple extends unknown[] = Pop<T>
> = T extends []
  ? -1
  : T extends [infer H, ...infer R]
  ? Equals<U, H> extends true
    ? _IdxTuple['length']
    : _LastIndexOf<R, U, Pop<_IdxTuple>>
  : never

type LastIndexOf<T, U> = _LastIndexOf<Reverse<T>, U>
