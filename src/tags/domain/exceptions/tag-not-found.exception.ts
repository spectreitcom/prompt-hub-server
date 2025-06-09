export class TagNotFoundException extends Error {
  constructor(id: string) {
    super(`Tag with id '${id}' not found`);
    this.name = 'TagNotFoundException';
  }
}
