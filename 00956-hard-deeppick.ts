// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<
    Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
]

// ============= Your Code Here =============

type UnionToIntersectionFn<T> = (
  T extends unknown ? (k: () => T) => void : never
) extends (k: infer Intersection) => void
  ? Intersection
  : never

type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last
  ? Last
  : never

type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never]
  ? Tuple
  : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>

export type UnionToIntersection<T> = (
  T extends unknown ? (x: T) => void : never
) extends (i: infer I) => void
  ? I
  : never

type IntersectTupleItems<T extends readonly unknown[]> = T extends readonly []
  ? unknown
  : T extends readonly [infer H, ...infer R]
  ? H & IntersectTupleItems<R>
  : never

type _DeepPick<T, P extends string> = P extends keyof T
  ? Pick<T, P>
  : P extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? { [K in L]: _DeepPick<T[L], R> }
    : unknown
  : unknown

type DeepPick<
  T,
  P extends string
> = UnionToTuple<P> extends infer X extends readonly string[]
  ? IntersectTupleItems<{ [K in keyof X]: _DeepPick<T, X[K]> }>
  : never
