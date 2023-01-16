// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<
    Equal<
      FilterOut<
        [never, 1, 'a', undefined, false, null],
        never | null | undefined
      >,
      [1, 'a', false]
    >
  >,
  Expect<
    Equal<
      FilterOut<[number | null | undefined, never], never | null | undefined>,
      [number | null | undefined]
    >
  >
]

// ============= Your Code Here =============

type FilterOut<T extends any[], F> = Unwrap<
  PerformFilter<
    EncapsulateUnionItems<T>,
    [F] extends [never] ? [never] : EncapsulateUnion<F>
  >
>

type PerformFilter<T extends any[], F> = T extends []
  ? []
  : T extends [infer H, ...infer R]
  ? H extends F
    ? PerformFilter<R, F>
    : [H, ...PerformFilter<R, F>]
  : never

type EncapsulateUnionItems<T extends readonly unknown[]> = {
  [K in keyof T]: [T[K]]
}

type EncapsulateUnion<T> = T extends unknown ? [T] : never

type Unwrap<T> = { [K in keyof T]: T[K] extends [infer U] ? U : never }
