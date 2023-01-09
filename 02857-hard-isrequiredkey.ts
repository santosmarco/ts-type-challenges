// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>
]

// ============= Your Code Here =============

type IsRequiredKey<T, K extends keyof T> = 0 extends (
  K extends keyof {
    [K_ in keyof T as T extends { [U in K_]-?: unknown } ? K_ : never]: unknown
  }
    ? 1
    : 0
)
  ? false
  : true
