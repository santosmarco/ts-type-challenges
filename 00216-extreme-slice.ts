// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
]

// ============= Your Code Here =============

type _BuildTuple<
  T extends number,
  _Acc extends readonly unknown[] = []
> = _Acc['length'] extends T ? _Acc : _BuildTuple<T, [..._Acc, unknown]>

type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false

type Positive<T extends number> = `${T}` extends `-${infer U extends number}`
  ? U
  : T

type Reverse<T extends readonly unknown[]> = T extends readonly []
  ? []
  : T extends readonly [infer Head, ...infer Rest]
  ? [...Reverse<Rest>, Head]
  : never

type _Subtract<
  X extends number,
  Y extends number,
  _AccX extends readonly unknown[] = _BuildTuple<X>,
  _AccY extends readonly unknown[] = []
> = _AccY['length'] extends Y
  ? _AccX['length']
  : _AccX extends readonly [infer _, ...infer TTail]
  ? _Subtract<X, Y, TTail, [..._AccY, unknown]>
  : never
type Subtract<X extends number, Y extends number> = _Subtract<
  X,
  Y
> extends infer TRes extends number
  ? TRes
  : never

type Slice<
  Arr extends readonly number[],
  Start extends number = 0,
  End extends number = Arr['length'],
  _Acc extends readonly number[] = [],
  _AccAll extends readonly undefined[] = [],
  _HasStarted extends boolean = false
> = IsNegative<End> extends true
  ? IsNegative<Start> extends true
    ? Reverse<Slice<Reverse<Arr>, Positive<End>, Positive<Start>>>
    : Slice<Arr, Start, Subtract<Arr['length'], Positive<End>>>
  : [Start, End] extends [End, Start]
  ? _Acc
  : [End, _AccAll['length']] extends [_AccAll['length'], End]
  ? _Acc
  : [Start, _AccAll['length']] extends [_AccAll['length'], Start]
  ? Slice<
      Arr,
      Start,
      End,
      [Arr[Start], undefined] extends [undefined, Arr[Start]]
        ? []
        : [Arr[Start]],
      [..._AccAll, undefined],
      true
    >
  : [_HasStarted, true] extends [true, _HasStarted]
  ? Slice<
      Arr,
      Start,
      End,
      [Arr[_AccAll['length']], undefined] extends [
        undefined,
        Arr[_AccAll['length']]
      ]
        ? _Acc
        : [..._Acc, Arr[_AccAll['length']]],
      [..._AccAll, undefined],
      true
    >
  : Slice<Arr, Start, End, _Acc, [..._AccAll, undefined], false>
