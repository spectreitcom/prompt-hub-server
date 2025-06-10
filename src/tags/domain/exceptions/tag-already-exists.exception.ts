export class TagAlreadyExistsException extends Error {
  constructor(value: string) {
    super(`Tag with value '${value}' already exists`);
    this.name = 'TagAlreadyExistsException';
  }
}
