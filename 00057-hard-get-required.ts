// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
]

// ============= Your Code Here =============

type GetRequired<T> = {
  [K in keyof T as undefined extends T[K]
    ? T[K] extends undefined
      ? K
      : never
    : K]-?: T[K]
} extends infer R
  ? { [K in keyof R as [never, R[K]] extends [R[K], never] ? never : K]: R[K] }
  : never
