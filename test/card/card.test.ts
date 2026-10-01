import { Card } from '../../src/class/card/card'
import { createMasterCard, createVisaCard } from '../helper/card.helpers'

describe('Card payments and limits', () => {
  let card: Card;

  beforeEach(() => {
    card = createVisaCard(1000)
  })

  test('creates a card with nothing spent', () => {
    expect(card.spentToday).toBe(0)
  })

  test('accepts a payment within the daily limit', () => {
    expect(card.pay(999)).toBeTruthy();
  })

  test('accepts a payment equal to the daily limit', () => {
    expect(card.pay(1000)).toBeTruthy();
  })

  test('declines a payment above the daily limit', () => {
    expect(card.pay(1001)).toBeFalsy();
    // или
    // expect(card.pay(500)).toBeTruthy();
    // expect(card.pay(501)).toBeFalsy();
  })

  test('declines a payment when the total for the day exceeds the limit', () => {
    expect(card.pay(500)).toBeTruthy();
    expect(card.pay(501)).toBeFalsy();
  })

  test('declines a payment with zero or negative amount', () => {
    expect(card.pay(0)).toBeFalsy();
    expect(card.pay(-1)).toBeFalsy();
  })
})

describe('Card blocking', () => {
  let card: Card

  beforeEach(() => {
    card = createMasterCard(500)
  })

  test('creates an active card that is not blocked', () => {
    expect(card.isBlocked).toBe(false);
    // 0 == false (falsy == yes, toBe(false) == no)
    // 1 == true
    // "" == false
    // "34132412" == true
  })

  test('hides the first 12 card numbers and left last 4 visible', () => {
    expect(card.maskCardNumber()).toHaveLength(19)
    expect(card.maskCardNumber()).toContain("****")
    expect(card.maskCardNumber()).toBe("**** **** **** " + card.lastFourDigits())
  })

  test('blocks the card', () => {
    card.block()
    expect(card.isBlocked).toBe(true);
  })

  test('unblocks a blocked card', () => {
    card.block()
    expect(card.isBlocked).toBe(true);
    card.unblock()
    expect(card.isBlocked).toBeFalsy();
  })

  test('declines a payment from a blocked card', () => {
    card.block()
    expect(card.isBlocked).toBe(true);
    expect(card.pay(1)).toBeFalsy();
  })

  test('accepts a payment again after unblocking', () => {
    card.block()
    expect(card.isBlocked).toBe(true);
    expect(card.pay(1)).toBeFalsy();
    card.unblock()
    expect(card.isBlocked).toBe(false);
    expect(card.pay(1)).toBe(true);
  })
})
