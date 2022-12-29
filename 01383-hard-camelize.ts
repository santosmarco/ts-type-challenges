// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string
        prop: { another_prop: string }
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ]
      }>,
      {
        someProp: string
        prop: { anotherProp: string }
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ]
      }
    >
  >
]

// ============= Your Code Here =============

type CamelCase<T> = T extends `${infer L}_${infer R}`
  ? `${L}${CamelCase<Capitalize<R>>}`
  : T

type CamelizeTuple<T> = T extends []
  ? T
  : T extends [infer H, ...infer R]
  ? [Camelize<H>, ...CamelizeTuple<R>]
  : never

type Camelize<T> = T extends string
  ? T
  : T extends unknown[]
  ? CamelizeTuple<T>
  : { [K in keyof T as CamelCase<K>]: Camelize<T[K]> }
