// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<
    Equal<
      SnakeCase<'getElementById' | 'getElementByClassNames'>,
      'get_element_by_id' | 'get_element_by_class_names'
    >
  >
]

// ============= Your Code Here =============

type SnakeCase<T extends string> = T extends ''
  ? ''
  : T extends `${infer H}${infer R}`
  ? `${H extends Uppercase<H> ? `_${Lowercase<H>}` : H}${SnakeCase<R>}`
  : never
