export class UserIdInvalidException extends Error {
  constructor() {
    super('User ID must be a valid UUID.');
    this.name = 'UserIdInvalidException';
  }
}
