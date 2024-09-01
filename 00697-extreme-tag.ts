// ============= Test Cases =============

import type { Equal, Expect, IsTrue } from './test-utils'

/**
 * Tests of assignable of tagged variables.
 */
interface I {
  foo: string
}

declare let x0: I
declare let x1: Tag<I, 'a'>
declare let x2: Tag<I, 'b'>
declare let x3: Tag<Tag<I, 'a'>, 'b'>
declare let x4: Tag<Tag<I, 'b'>, 'a'>
declare let x5: Tag<Tag<I, 'c'>, 'a'>
declare let x6: Tag<Tag<I, 'c'>, 'b'>
declare let x7: UnTag<Tag<Tag<I, 'c'>, 'b'>>

x0 = x1 = x0 = x2 = x0 = x3 = x0 = x4 = x0 = x5 = x0 = x6 = x0 = x7 = x0
x1 = x2 = x1 = x3 = x1 = x4 = x1 = x5 = x1 = x6 = x1 = x7 = x1
x2 = x3 = x2 = x4 = x2 = x5 = x2 = x6 = x2 = x7 = x2
x3 = x4 = x3 = x5 = x3 = x6 = x3 = x7 = x3
x4 = x5 = x4 = x6 = x4 = x7 = x4
x5 = x6 = x5 = x7 = x5
x6 = x7 = x6

declare let y0: string
declare let y1: Tag<string, 'a'>
declare let y2: Tag<string, 'b'>
declare let y3: Tag<Tag<string, 'a'>, 'b'>
declare let y4: Tag<Tag<string, 'b'>, 'a'>
declare let y5: Tag<Tag<string, 'c'>, 'a'>
declare let y6: Tag<Tag<string, 'c'>, 'b'>
declare let y7: UnTag<Tag<Tag<string, 'c'>, 'b'>>

y0 = y1 = y0 = y2 = y0 = y3 = y0 = y4 = y0 = y5 = y0 = y6 = y0 = y7 = y0
y1 = y2 = y1 = y3 = y1 = y4 = y1 = y5 = y1 = y6 = y1 = y7 = y1
y2 = y3 = y2 = y4 = y2 = y5 = y2 = y6 = y2 = y7 = y2
y3 = y4 = y3 = y5 = y3 = y6 = y3 = y7 = y3
y4 = y5 = y4 = y6 = y4 = y7 = y4
y5 = y6 = y5 = y7 = y5
y6 = y7 = y6

// @ts-expect-error
x0 = y0
// @ts-expect-error
x1 = y1
// @ts-expect-error
x2 = y2
// @ts-expect-error
x3 = y3
// @ts-expect-error
x4 = y4
// @ts-expect-error
x5 = y5
// @ts-expect-error
x6 = y6
// @ts-expect-error
x7 = y7

declare const UNIQUE_SYMBOL: unique symbol
type US = typeof UNIQUE_SYMBOL

/**
 * Tests of API (Tag, GetTags, Untag, HasTag, HasTags, HasExactTags).
 */
type cases = [
  /**
   * Tag.
   */
  IsTrue<Equal<Tag<null, 'foo'>, null>>,
  IsTrue<Equal<Tag<undefined, 'foo'>, undefined>>,
  IsTrue<Equal<'x', keyof Tag<{ x: 0 }, 'foo'> & string>>,

  /**
   * GetTags.
   */
  IsTrue<Equal<GetTags<null>, []>>,
  IsTrue<Equal<GetTags<any>, []>>,
  IsTrue<Equal<GetTags<undefined>, []>>,
  IsTrue<Equal<GetTags<Tag<any, 'foo'>>, ['foo']>>,
  IsTrue<Equal<GetTags<Tag<null | 1, 'foo'>>, ['foo']>>,
  IsTrue<Equal<GetTags<Tag<0, 'foo'> | 1>, []>>,
  IsTrue<Equal<GetTags<Tag<{}, 'foo'> | Tag<1, 'foo'>>, ['foo']>>,
  IsTrue<Equal<GetTags<Tag<string, 'foo'>>, ['foo']>>,
  IsTrue<Equal<GetTags<Tag<never, 'foo'>>, ['foo']>>,
  IsTrue<Equal<GetTags<Tag<Tag<string, 'foo'>, 'bar'>>, ['foo', 'bar']>>,
  IsTrue<
    Equal<
      GetTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>>,
      ['foo', 'bar', 'baz']
    >
  >,

  /**
   * UnTag.
   */
  IsTrue<Equal<UnTag<null>, null>>,
  IsTrue<Equal<UnTag<undefined>, undefined>>,
  IsTrue<Equal<UnTag<Tag<{}, 'foo'>>, {}>>,
  IsTrue<Equal<UnTag<Tag<Tag<{ x: 0 }, 'foo'>, 'bar'>>, { x: 0 }>>,
  IsTrue<Equal<keyof UnTag<Tag<Tag<number, 'foo'>, 'bar'>>, keyof number>>,

  /**
   * HasTag.
   */
  Expect<Equal<HasTag<null, 'foo'>, false>>,
  Expect<Equal<HasTag<undefined, 'foo'>, false>>,
  Expect<Equal<HasTag<Tag<any, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<1, 'foo'> | {}, 'foo'>, false>>,
  Expect<Equal<HasTag<Tag<{}, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<0, 'foo'> | Tag<1, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<0, 'foo'> | Tag<1, 'bar'>, 'foo'>, false>>,
  Expect<Equal<HasTag<Tag<Tag<{}, 'foo'>, 'bar'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<Tag<symbol, 'bar'>, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<Tag<{}, 'bar'>, 'baz'>, 'foo'>, false>>,
  Expect<Equal<HasTag<Tag<true, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<null, 'foo'>, 'foo'>, false>>,
  Expect<Equal<HasTag<Tag<Tag<undefined, 'foo'>, 'bar'>, 'bar'>, false>>,
  Expect<Equal<HasTag<Tag<Tag<false, 'foo'>, 'bar'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<Tag<never, 'bar'>, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<{}, 'foo'>, 'foo'>, true>>,
  Expect<Equal<HasTag<Tag<{}, 'foo'>, 'bar'>, false>>,
  Expect<Equal<HasTag<{}, 'foo'>, false>>,

  /**
   * HasTags.
   */
  Expect<Equal<HasTags<null, ['foo']>, false>>,
  Expect<Equal<HasTags<undefined, ['foo']>, false>>,
  Expect<Equal<HasTags<Tag<any, 'bar'>, ['foo']>, false>>,
  Expect<Equal<HasTags<Tag<{}, 'bar'>, ['foo']>, false>>,
  Expect<Equal<HasTags<Tag<{}, 'foo'>, ['foo']>, true>>,
  Expect<Equal<HasTags<Tag<any, 'foo'>, ['foo']>, true>>,
  Expect<Equal<HasTags<Tag<{} | undefined, 'foo'>, ['foo']>, true>>,
  Expect<Equal<HasTags<Tag<Tag<string, 'foo'>, 'bar'>, ['foo', 'bar']>, true>>,
  Expect<Equal<HasTags<Tag<Tag<3n, 'foo'>, 'bar'>, ['foo', 'bar']>, true>>,
  Expect<Equal<HasTags<Tag<Tag<{}, 'bar'>, 'foo'>, ['foo', 'bar']>, false>>,
  Expect<
    Equal<HasTags<Tag<Tag<Tag<{}, 'baz'>, 'foo'>, 'bar'>, ['foo', 'bar']>, true>
  >,
  Expect<
    Equal<
      HasTags<Tag<Tag<Tag<symbol, 'baz'>, 'foo'>, 'bar'>, ['foo', 'bar']>,
      true
    >
  >,
  Expect<
    Equal<HasTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']>, true>
  >,
  Expect<
    Equal<HasTags<Tag<Tag<Tag<0, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']>, true>
  >,
  Expect<
    Equal<
      HasTags<Tag<Tag<Tag<{}, 'foo'>, 'baz'>, 'bar'>, ['foo', 'bar']>,
      false
    >
  >,
  Expect<Equal<HasTags<Tag<Tag<unknown, 'foo'>, 'bar'>, ['foo', 'bar']>, true>>,

  /**
   * HasExactTags.
   */
  Expect<Equal<HasExactTags<0, []>, true>>,
  Expect<Equal<HasExactTags<null, []>, true>>,
  Expect<Equal<HasExactTags<undefined, []>, true>>,
  Expect<Equal<HasExactTags<Tag<number, 'foo'>, ['foo']>, true>>,
  Expect<Equal<HasExactTags<Tag<any, 'foo'>, ['bar']>, false>>,
  Expect<
    Equal<HasExactTags<Tag<Tag<any, 'foo'>, 'bar'>, ['foo', 'bar']>, true>
  >,
  Expect<Equal<HasExactTags<Tag<'', 'foo'>, ['foo']>, true>>,
  Expect<Equal<HasExactTags<Tag<US, 'foo'>, ['foo']>, true>>,
  Expect<Equal<HasExactTags<Tag<{}, 'foo'>, ['bar']>, false>>,
  Expect<
    Equal<
      HasExactTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']>,
      false
    >
  >,
  Expect<
    Equal<
      HasExactTags<
        Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>,
        ['foo', 'bar', 'baz']
      >,
      true
    >
  >,
  Expect<
    Equal<HasExactTags<Tag<Tag<void, 'foo'>, 'bar'>, ['foo', 'bar']>, true>
  >
]

// ============= Your Code Here =============

const TAGS = Symbol('TAGS')
type TAGS = typeof TAGS

const UNSUPPORTED = Symbol('UNSUPPORTED')
type UNSUPPORTED = typeof UNSUPPORTED

const PLACEHOLDER_ANY = Symbol('PLACEHOLDER_ANY')
type PLACEHOLDER_ANY = typeof PLACEHOLDER_ANY

const PLACEHOLDER_NEVER = Symbol('PLACEHOLDER_NEVER')
type PLACEHOLDER_NEVER = typeof PLACEHOLDER_NEVER

const PLACEHOLDER_EMPTY_OBJECT = Symbol('PLACEHOLDER_EMPTY_OBJECT')
type PLACEHOLDER_EMPTY_OBJECT = typeof PLACEHOLDER_EMPTY_OBJECT

type UnionToIntersection<T> = (
  T extends unknown ? (arg: T) => void : never
) extends (arg: infer U) => void
  ? U & T
  : never

type LastOfUnion<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never

type UnionToTuple<T, _TAcc extends readonly unknown[] = []> = [T] extends [
  never
]
  ? _TAcc
  : UnionToTuple<Exclude<T, LastOfUnion<T>>, [LastOfUnion<T>, ..._TAcc]>

type _GetTags<B> = B extends null | undefined
  ? never
  : B extends { [TAGS]?: infer TTags }
  ? Equal<B, {}> extends true
    ? UNSUPPORTED
    : Equal<B, PLACEHOLDER_EMPTY_OBJECT> extends true
    ? UNSUPPORTED
    : UnionToTuple<
        keyof { [K in keyof TTags as TTags[K] extends false ? never : K]-?: K }
      >
  : UNSUPPORTED
type GetTags<B> = _GetTags<B> extends infer TTags_
  ? Exclude<TTags_, []> extends infer TTags
    ? [TTags] extends [never]
      ? []
      : UNSUPPORTED extends TTags
      ? []
      : TTags
    : never
  : never

type Tag<B, T extends string> = Equal<B, never> extends true
  ? Tag<PLACEHOLDER_NEVER, T>
  : Equal<B, any> extends true
  ? Tag<PLACEHOLDER_ANY, T>
  : Equal<B, {}> extends true
  ? Tag<PLACEHOLDER_EMPTY_OBJECT, T>
  : B extends null | undefined
  ? B
  : UnTag<B> & {
      [TAGS]?: (B extends { [TAGS]?: infer TTags } ? TTags : unknown) & {
        [K in T]?: true
      } & Record<string, false>
    }

type UnTag<B> = B extends null | undefined
  ? B
  : B extends PLACEHOLDER_EMPTY_OBJECT
  ? {}
  : Omit<B, TAGS>

type HasTag<B, T extends string> = T extends GetTags<B>[number] ? true : false

type HasTags<B, T extends readonly string[]> = T extends readonly []
  ? true
  : T extends readonly [
      infer THead extends string,
      ...infer TTail extends string[]
    ]
  ? HasTag<B, THead> extends false
    ? false
    : HasTags<B, TTail>
  : true

type HasExactTags<B, T extends readonly string[]> = any
