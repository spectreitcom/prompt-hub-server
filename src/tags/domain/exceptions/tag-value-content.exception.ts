export class TagValueContentException extends Error {
  constructor() {
    super('Tag value must contain at least one alphanumeric character.');
    this.name = 'TagValueContentException';
  }
}
