// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
]

// ============= Your Code Here =============

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  CurrIdxTuple extends unknown[] = [],
  IsFilling extends boolean = false
> = T extends []
  ? []
  : [Start, End] extends [End, Start]
  ? T
  : [Start, End] extends [0, T['length']]
  ? { [K in keyof T]: N }
  : T extends [infer Head, ...infer Rest]
  ? [
      [Start, CurrIdxTuple['length']] extends [CurrIdxTuple['length'], Start]
        ? N
        : IsFilling extends true
        ? N
        : Head,
      Fill<
        Rest,
        N,
        Start,
        End,
        [...CurrIdxTuple, unknown],
        [Start, CurrIdxTuple['length']] extends [CurrIdxTuple['length'], Start]
          ? true
          : false
      >
    ]
  : never
