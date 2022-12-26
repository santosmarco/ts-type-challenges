// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<
      BEM<'btn', [], ['small', 'medium', 'large']>,
      'btn--small' | 'btn--medium' | 'btn--large'
    >
  >
]

// ============= Your Code Here =============

type MapToPrefix<T, U extends string> = T extends []
  ? []
  : T extends [infer H extends string, ...infer R]
  ? [`${U}${H}`, ...MapToPrefix<R, U>]
  : never

type Prefix<T, U extends string> = T extends [] ? '' : MapToPrefix<T, U>[number]

type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${Prefix<E, '__'>}${Prefix<M, '--'>}`
