export class TagValueLengthException extends Error {
  constructor() {
    super('Tag value must be between 1 and 50 characters.');
    this.name = 'TagValueLengthException';
  }
}
