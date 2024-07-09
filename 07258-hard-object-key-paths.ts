// ============= Test Cases =============

import type { Equal, Expect, ExpectExtends } from './test-utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number
        person: { name: string; age: number }
      }>,
      'refCount' | 'person' | 'person.name' | 'person.age'
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>
  >,
  Expect<
    Equal<
      ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>,
      false
    >
  >
]

// ============= Your Code Here =============

type TupleKeyPaths<T extends readonly unknown[]> = Exclude<
  keyof T,
  keyof unknown[]
> extends infer X extends string
  ? `.${X}` | `${'.' | ''}[${X}]`
  : never

export type ObjectKeyPaths<T extends object> = {
  [K in Extract<keyof T, string>]:
    | K
    | (T[K] extends object
        ? `${K}${T[K] extends readonly unknown[]
            ? TupleKeyPaths<T[K]>
            : `.${ObjectKeyPaths<T[K]> & string}`}`
        : never)
}[Extract<keyof T, string>]

type c = ObjectKeyPaths<typeof ref>
