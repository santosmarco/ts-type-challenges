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

type RequiredKeys<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: T[K]
} extends infer X
  ? keyof X
  : never

type c = RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>
