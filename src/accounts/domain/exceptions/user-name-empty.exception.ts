export class UserNameEmptyException extends Error {
  constructor() {
    super('Username cannot be empty.');
    this.name = 'UserNameEmptyException';
  }
}
