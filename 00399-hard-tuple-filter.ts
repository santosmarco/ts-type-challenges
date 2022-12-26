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

type FilterOut<T extends any[], F> = T extends []
  ? []
  : T extends [infer Head, ...infer Rest]
  ? [Head, never] extends [never, Head]
    ? FilterOut<Rest, F>
    : [Head, F] extends [F, Head]
    ? FilterOut<Rest, F>
    : [Head, ...FilterOut<Rest, F>]
  : never

type c = FilterOut<[number | null | undefined, never], never | null | undefined>

type c2 = FilterOut<
  [never, 1, 'a', undefined, false, null],
  never | null | undefined
>

type b = number | null | undefined extends never | null | undefined ? 2 : 1
