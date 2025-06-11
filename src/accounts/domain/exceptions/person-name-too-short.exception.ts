export class PersonNameTooShortException extends Error {
  constructor() {
    super('Person name must be at least 2 characters long.');
    this.name = 'PersonNameTooShortException';
  }
}
