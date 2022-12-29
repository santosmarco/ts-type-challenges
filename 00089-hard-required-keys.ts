// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      'a' | 'c' | 'd'
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
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

type RequiredKeys<T> = keyof GetRequired<T>
