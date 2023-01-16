// ============= Test Cases =============

import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ]
    },
  },
})

// ============= Your Code Here =============

type Ctor =
  | (abstract new (...args: any[]) => any)
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | RegExpConstructor

type PropInstance<T extends Ctor> = T extends StringConstructor
  ? string
  : T extends BooleanConstructor
  ? boolean
  : T extends NumberConstructor
  ? number
  : T extends RegExpConstructor
  ? RegExp
  : T extends abstract new (...args: any[]) => infer I
  ? I
  : any

type MapProps<P extends Record<string, { type?: Ctor | Ctor[] } | Ctor>> = {
  [K in keyof P]: P[K] extends { type: infer C extends Ctor }
    ? PropInstance<C>
    : P[K] extends { type: infer C extends Ctor[] }
    ? PropInstance<C[number]>
    : P[K] extends infer C extends Ctor
    ? PropInstance<C>
    : P[K] extends infer C extends Ctor[]
    ? PropInstance<C[number]>
    : P[K] extends abstract new (...args: any[]) => infer I
    ? I
    : any
}

declare function VueBasicProps<
  P extends Record<string, { type?: Ctor | Ctor[] } | Ctor>,
  D extends Record<string, unknown>,
  C extends Record<string, (...args: readonly any[]) => any>,
  M extends Record<string, (...args: readonly any[]) => any>
>(
  options: {
    readonly props: P
    readonly data: () => D
    readonly computed: C & ThisType<D>
    readonly methods: M &
      ThisType<D & M & MapProps<P> & { [K in keyof C]: ReturnType<C[K]> }>
  } & ThisType<MapProps<P>>
): any
