// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
)
const curried3 = Currying(() => true)

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>
]

// ============= Your Code Here =============

declare function Currying<P extends any[]>(
  fn: (...args: P) => true
): P extends []
  ? typeof fn
  : P extends [infer Head, ...infer Rest]
  ? Rest extends []
    ? (arg: Head) => true
    : (arg: Head) => ReturnType<typeof Currying<Rest>>
  : never
