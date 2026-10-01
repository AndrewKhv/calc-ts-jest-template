export class Card {
  private readonly cardNumber: string
  dailyLimit: number
  spentToday: number
  isBlocked: boolean

  constructor(number: string, dailyLimit: number) {
    this.cardNumber = number
    this.dailyLimit = dailyLimit
    this.spentToday = 0
    this.isBlocked = false
  }

  // methods --> ACTIONS
  block(): void {
    this.isBlocked = true
  }

  unblock(): void {
    this.isBlocked = false
  }

  lastFourDigits(): string {
    return this.cardNumber.slice(-4);
  }

  maskCardNumber(): string {
    return '**** **** **** ' + this.cardNumber.slice(-4)
  }

  // returns true if the payment went through, false if it was declined
  pay(amount: number): boolean {
    if (amount <= 0) {
      return false
    }

    if (this.isBlocked) {
      return false
    }

    if (this.spentToday + amount > this.dailyLimit) {
      return false
    }

    this.spentToday = this.spentToday + amount
    return true
  }
}
