// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>
]

// ============= Your Code Here =============

type Replace<
  T extends string,
  U extends string,
  V extends string
> = T extends ''
  ? ''
  : T extends `${infer THead}${infer TRest}`
  ? THead extends U
    ? `${V}${Replace<TRest, U, V>}`
    : `${THead}${Replace<TRest, U, V>}`
  : never

type Split<
  T extends string,
  TDelimiter extends string
> = T extends `${infer TLeft}${TDelimiter}${infer TRight}`
  ? [TLeft, ...Split<TRight, TDelimiter>]
  : [T]

type ParseUrlParams<T extends string> = Replace<
  Extract<Split<T, '/'>[number], `:${string}`>,
  ':',
  ''
>
