import {AccountStatuses} from "../../../support/enum";

export class Account {
  balance: number
  status: string

  constructor(initialBalance: number) {
    this.balance = initialBalance

    if (initialBalance < 0) {
      this.status = AccountStatuses.Pending
    } else {
      this.status = AccountStatuses.Active
    }
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      return
    }

    this.balance = this.balance + amount
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      return
    }

    this.balance = this.balance - amount
  }
}
