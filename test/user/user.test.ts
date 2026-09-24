import { User } from '../../src/class/user/user'

describe('User', () => {
  test('creates a user with a name and age', () => {
    const user = new User('Anna', 20)

    expect(user.name).toBe('Anna')
    expect(user.age).toBe(20)
  })

  test('returns true when the user is 18 years old or older', () => {
    const user = new User('Anna', 20)

    expect(user.isAdult()).toBeTruthy();
  })

  test('returns false when the user is younger than 18', () => {
    const user = new User('Anna', 16);

    expect(user.isAdult()).toBeFalsy()
  })

  test('verifies the user', () => {
    const user = new User('Anna', 18);

    user.verify();

    expect(user.isVerified).toBeTruthy()
  })
})
