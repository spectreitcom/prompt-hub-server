export class UserNameTooLongException extends Error {
  constructor() {
    super('Username cannot exceed 50 characters.');
    this.name = 'UserNameTooLongException';
  }
}
