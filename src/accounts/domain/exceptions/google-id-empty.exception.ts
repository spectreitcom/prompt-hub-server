export class GoogleIdEmptyException extends Error {
  constructor() {
    super('GoogleId cannot be empty.');
    this.name = 'GoogleIdEmptyException';
  }
}
