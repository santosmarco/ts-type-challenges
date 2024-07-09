// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<
    Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, 'person.age.value'>,
      { person: { name: string; age: {} } }
    >
  >
]

// ============= Your Code Here =============

type DeepOmit<T, P extends string> = P extends `${infer TLeft}.${infer TRight}`
  ? TLeft extends keyof T
    ? { [K in keyof T]: K extends TLeft ? DeepOmit<T[TLeft], TRight> : T[K] }
    : never
  : P extends keyof T
  ? { [K in keyof T as K extends P ? never : K]: T[K] }
  : T
