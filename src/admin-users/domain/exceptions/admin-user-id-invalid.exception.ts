export class AdminUserIdInvalidException extends Error {
  constructor() {
    super('Admin User ID must be a valid UUID.');
    this.name = 'AdminUserIdInvalidException';
  }
}
