// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type CaseTypeOne =
  | 'cmd ctrl'
  | 'cmd opt'
  | 'cmd fn'
  | 'ctrl opt'
  | 'ctrl fn'
  | 'opt fn'

type cases = [Expect<Equal<Combs, CaseTypeOne>>]

// ============= Your Code Here =============

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

type Combine<T extends readonly unknown[]> = T extends readonly []
  ? never
  : T extends readonly [
      infer TFirst extends string,
      ...infer TTail extends readonly string[],
    ]
  ? `${TFirst} ${TTail[number]}` | Combine<TTail>
  : never

// 实现 Combs
type Combs = Combine<ModifierKeys>
