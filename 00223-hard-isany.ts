// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>
]

// ============= Your Code Here =============

type IsAny<T> = (<U>() => U extends T ? true : false) extends <
  Y
>() => Y extends any ? true : false
  ? true
  : false
