// ============= Test Cases =============

import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ['1']>>,
  Expect<Equal<FizzBuzz<5>, ['1', '2', 'Fizz', '4', 'Buzz']>>,
  Expect<
    Equal<
      FizzBuzz<20>,
      [
        '1',
        '2',
        'Fizz',
        '4',
        'Buzz',
        'Fizz',
        '7',
        '8',
        'Fizz',
        'Buzz',
        '11',
        'Fizz',
        '13',
        '14',
        'FizzBuzz',
        '16',
        '17',
        'Fizz',
        '19',
        'Buzz'
      ]
    >
  >,
  Expect<
    Equal<
      FizzBuzz<100>,
      [
        '1',
        '2',
        'Fizz',
        '4',
        'Buzz',
        'Fizz',
        '7',
        '8',
        'Fizz',
        'Buzz',
        '11',
        'Fizz',
        '13',
        '14',
        'FizzBuzz',
        '16',
        '17',
        'Fizz',
        '19',
        'Buzz',
        'Fizz',
        '22',
        '23',
        'Fizz',
        'Buzz',
        '26',
        'Fizz',
        '28',
        '29',
        'FizzBuzz',
        '31',
        '32',
        'Fizz',
        '34',
        'Buzz',
        'Fizz',
        '37',
        '38',
        'Fizz',
        'Buzz',
        '41',
        'Fizz',
        '43',
        '44',
        'FizzBuzz',
        '46',
        '47',
        'Fizz',
        '49',
        'Buzz',
        'Fizz',
        '52',
        '53',
        'Fizz',
        'Buzz',
        '56',
        'Fizz',
        '58',
        '59',
        'FizzBuzz',
        '61',
        '62',
        'Fizz',
        '64',
        'Buzz',
        'Fizz',
        '67',
        '68',
        'Fizz',
        'Buzz',
        '71',
        'Fizz',
        '73',
        '74',
        'FizzBuzz',
        '76',
        '77',
        'Fizz',
        '79',
        'Buzz',
        'Fizz',
        '82',
        '83',
        'Fizz',
        'Buzz',
        '86',
        'Fizz',
        '88',
        '89',
        'FizzBuzz',
        '91',
        '92',
        'Fizz',
        '94',
        'Buzz',
        'Fizz',
        '97',
        '98',
        'Fizz',
        'Buzz'
      ]
    >
  >
]

// ============= Your Code Here =============

type _FizzBuzz<
  N extends number,
  Acc extends readonly unknown[] = [],
  Mult3 extends readonly unknown[] = [],
  Mult5 extends readonly unknown[] = []
> = `${N}` extends `${Acc['length']}`
  ? Acc extends readonly [string, ...infer R]
    ? R
    : never
  : 3 extends Mult3['length']
  ? 5 extends Mult5['length']
    ? _FizzBuzz<N, [...Acc, 'FizzBuzz'], [unknown], [unknown]>
    : _FizzBuzz<N, [...Acc, 'Fizz'], [unknown], [...Mult5, unknown]>
  : 5 extends Mult5['length']
  ? _FizzBuzz<N, [...Acc, 'Buzz'], [...Mult3, unknown], [unknown]>
  : _FizzBuzz<
      N,
      [...Acc, `${Acc['length']}`],
      [...Mult3, unknown],
      [...Mult5, unknown]
    >

type BuildTuple<
  N extends number,
  Res extends readonly unknown[] = []
> = N extends Res['length'] ? Res : BuildTuple<N, [...Res, unknown]>

type FizzBuzz<N extends number> =
  BuildTuple<N> extends infer U extends readonly unknown[]
    ? _FizzBuzz<
        [...U, unknown]['length'] extends infer L extends number ? L : never
      >
    : never
