export class PersonNameTooLongException extends Error {
  constructor() {
    super('Person name cannot exceed 100 characters.');
    this.name = 'PersonNameTooLongException';
  }
}
