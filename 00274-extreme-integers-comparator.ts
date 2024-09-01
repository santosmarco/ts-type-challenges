// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
  >
]

// ============= Your Code Here =============

type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false

type ToPositive<T extends number> = `${T}` extends `-${infer N extends number}`
  ? N
  : T

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type _Comparator<
  A extends number,
  B extends number,
  _AAcc extends readonly unknown[] = [],
  _BAcc extends readonly unknown[] = []
> = _AAcc['length'] extends A
  ? _BAcc['length'] extends B
    ? Comparison.Equal
    : Comparison.Lower
  : _BAcc['length'] extends B
  ? Comparison.Greater
  : _Comparator<A, B, [..._AAcc, unknown], [..._BAcc, unknown]>
type Comparator<A extends number, B extends number> = Equal<A, B> extends true
  ? Comparison.Equal
  : IsNegative<A> extends true
  ? IsNegative<B> extends true
    ? _Comparator<ToPositive<B>, ToPositive<A>>
    : Comparison.Lower
  : IsNegative<B> extends true
  ? Comparison.Greater
  : _Comparator<A, B>
