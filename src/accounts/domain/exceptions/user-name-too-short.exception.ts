export class UserNameTooShortException extends Error {
  constructor() {
    super('Username must be at least 3 characters long.');
    this.name = 'UserNameTooShortException';
  }
}
