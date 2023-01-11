// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>
]

// ============= Your Code Here =============

type ValidDay<
  D1 extends string,
  D2 extends string,
  D1Max extends 2 | 3,
  D2Max extends 8 | 9 | 0 | 1
> = D1 extends keyof (infer R extends {
  '0': D2 extends `${0}` ? false : true
  '1': true
  '2': D1Max extends 2
    ? D2 extends `${
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | (D2Max extends 9 ? 8 | 9 : 8)}`
      ? true
      : false
    : D2 extends `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    ? true
    : false
  '3': D1Max extends 3
    ? D2 extends `${D2Max extends 1 ? 0 | 1 : 0}`
      ? true
      : false
    : false
})
  ? R[D1]
  : false

type ValidDate<T extends string> =
  T extends `${infer M1}${infer M2}${infer D1}${infer D2}`
    ? `${M1}${M2}` extends keyof (infer R extends {
        '01': ValidDay<D1, D2, 3, 1>
        '02': ValidDay<D1, D2, 2, 8>
        '03': ValidDay<D1, D2, 3, 0>
        '04': ValidDay<D1, D2, 3, 1>
        '05': ValidDay<D1, D2, 3, 0>
        '06': ValidDay<D1, D2, 3, 1>
        '07': ValidDay<D1, D2, 3, 0>
        '08': ValidDay<D1, D2, 3, 1>
        '09': ValidDay<D1, D2, 3, 0>
        '10': ValidDay<D1, D2, 3, 1>
        '11': ValidDay<D1, D2, 3, 0>
        '12': ValidDay<D1, D2, 3, 1>
      })
      ? R[`${M1}${M2}`]
      : false
    : false
