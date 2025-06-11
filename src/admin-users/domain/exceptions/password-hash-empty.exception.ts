export class PasswordHashEmptyException extends Error {
  constructor() {
    super('Password hash cannot be empty.');
    this.name = 'PasswordHashEmptyException';
  }
}
