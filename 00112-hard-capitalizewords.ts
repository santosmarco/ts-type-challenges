// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<
    Equal<
      CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>,
      'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'
    >
  >,
  Expect<Equal<CapitalizeWords<''>, ''>>
]

// ============= Your Code Here =============

type IsEmoji<S extends string> = S extends `${string}${infer R}`
  ? R extends ''
    ? 0
    : 1
  : never

type _CapitalizeWords<S extends string> = S extends ''
  ? S
  : S extends `${infer L0}${infer R0}`
  ? `${L0}${_CapitalizeWords<
      R0 extends `${infer L1}${infer R1}`
        ? Lowercase<L1> extends Uppercase<L1>
          ? `${L1}${Capitalize<R1>}`
          : R0
        : R0
    >}`
  : ''

type CapitalizeWords<S extends string> = _CapitalizeWords<Capitalize<S>>
