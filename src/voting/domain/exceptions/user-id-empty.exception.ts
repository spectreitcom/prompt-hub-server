export class UserIdEmptyException extends Error {
  constructor() {
    super('User ID cannot be empty.');
    this.name = 'UserIdEmptyException';
  }
}
