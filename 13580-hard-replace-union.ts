// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<
    Equal<
      UnionReplace<
        Function | Date | object,
        [[Date, string], [Function, undefined]]
      >,
      undefined | string | object
    >
  >
]

// ============= Your Code Here =============

type UnionReplace<T, U extends [any, any][]> =
  | Exclude<T, U[number][0]>
  | U[number][1]
