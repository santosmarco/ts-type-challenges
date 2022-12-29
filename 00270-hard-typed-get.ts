// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar'; count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>
]

type Data = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}

// ============= Your Code Here =============

type GetSides<S> = S extends `${infer L}.${infer R}`
  ? [left: L, right: R]
  : [left: S, right: '']

type Get<T, K> = K extends keyof T
  ? T[K]
  : GetSides<K> extends [infer L, infer R]
  ? L extends keyof T
    ? R extends ''
      ? T[L]
      : Get<T[L], R>
    : never
  : never
