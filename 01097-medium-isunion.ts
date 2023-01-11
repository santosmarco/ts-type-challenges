// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>
]

// ============= Your Code Here =============

type GetUnionLast<T> = (
  (T extends T ? (x: () => T) => unknown : never) extends (
    x: infer U
  ) => unknown
    ? U
    : never
) extends () => infer U
  ? U
  : never

type IsUnion<T, _Acc extends unknown[] = []> = [T] extends [never]
  ? _Acc['length'] extends 0 | 1
    ? false
    : true
  : IsUnion<Exclude<T, GetUnionLast<T>>, [..._Acc, GetUnionLast<T>]>
