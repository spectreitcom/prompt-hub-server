export class AdminUserIdEmptyException extends Error {
  constructor() {
    super('Admin User ID cannot be empty.');
    this.name = 'AdminUserIdEmptyException';
  }
}
