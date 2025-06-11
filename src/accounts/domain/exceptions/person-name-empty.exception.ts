export class PersonNameEmptyException extends Error {
  constructor() {
    super('Person name cannot be empty.');
    this.name = 'PersonNameEmptyException';
  }
}
