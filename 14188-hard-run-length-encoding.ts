// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>
]

// ============= Your Code Here =============

type ToNum<T extends string> = `${T}` extends `${infer N extends number}`
  ? N
  : T

type BuildTupleOf<
  L extends number,
  T extends string,
  _Acc extends readonly T[] = []
> = _Acc['length'] extends L ? _Acc : BuildTupleOf<L, T, [..._Acc, T]>

type Join<T extends readonly string[]> = T extends readonly []
  ? ''
  : T extends readonly [
      infer H extends string,
      ...infer R extends readonly string[]
    ]
  ? `${H}${Join<R>}`
  : never

namespace RLE {
  export type Encode<
    S extends string,
    Curr extends string = S extends `${infer H}${string}` ? H : never,
    Count extends readonly unknown[] = []
  > = S extends ''
    ? Curr
    : S extends `${infer H}${infer R}`
    ? H extends Curr
      ? Encode<R, H, [...Count, unknown]>
      : `${Count['length'] extends 1 ? '' : Count['length']}${Curr}${Encode<
          R,
          H,
          [unknown]
        >}`
    : never

  export type Decode<S extends string> =
    S extends `${infer N}${infer C}${infer R}`
      ? `${Join<
          BuildTupleOf<
            ToNum<N> extends number ? ToNum<N> : 1,
            ToNum<N> extends number ? C : N
          >
        >}${Decode<ToNum<N> extends number ? R : `${C}${R}`>}`
      : S
}
