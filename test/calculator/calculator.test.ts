import { sum, subtract } from '../../src/functions/calculator'

describe('Test for sum function', () => {
  test('TL-006-1 sums two positive integer numbers: basic', () => {
    const expectedResult: number = 4
    const actualResult: number = sum(2, 2)
    expect(expectedResult).toBe(actualResult)
  })

  test('TL-006-2 sums two positive float numbers: basic', () => {
    const sumResult = sum(0.1, 0.2);
    expect(sumResult).toBeCloseTo(0.3, 5)
  })
})

describe('Tests for subtract function', () => {
  test('TL-006-3 sub two positive integer numbers: critical path', () => {
    expect(subtract(3, 2)).toBe(1);
  })

  test('TL-006-4 sub two positive integer numbers: negative test', () => {
    expect(subtract(3, 2)).not.toBe(2);
  })
})
