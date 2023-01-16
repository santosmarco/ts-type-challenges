// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

SimpleVue({
  data() {
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
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})

// ============= Your Code Here =============

declare function SimpleVue<
  D extends Record<string, unknown>,
  C extends Record<string, (...args: readonly any[]) => any>,
  M extends Record<string, (...args: readonly any[]) => any & ThisType<M>>
>(options: {
  readonly data: (this: void) => D
  readonly computed: C & ThisType<D>
  readonly methods: M & ThisType<D & M & { [K in keyof C]: ReturnType<C[K]> }>
}): any
