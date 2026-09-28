import { Account } from '../../src/class/account/account'
import {AccountStatuses} from "../../support/enum";

describe('Account', () => {
  const initialBalance = 100;

  test('creates an active account with a positive initial balance', () => {
    const account = new Account(initialBalance)

    expect(account.balance).toBe(initialBalance)
    expect(account.status).toBe(AccountStatuses.Active)
  })

  test('creates a pending account with a negative initial balance', () => {
    const account = new Account(initialBalance * (-1))

    expect(account.status).toBe(AccountStatuses.Pending)
  })

  test('adds money to the balance', () => {
    const account = new Account(initialBalance)

    account.deposit(50)

    expect(account.balance).toBe(150)
  })

  test('withdraws money from the balance', () => {
    const account = new Account(initialBalance)

    account.withdraw(100)

    expect(account.balance).toBe(0)
  })

  test('does not change the balance when withdrawing more than available', () => {
    const account = new Account(initialBalance)

    account.withdraw(101)

    expect(account.balance).toBe(initialBalance)
  })
})
