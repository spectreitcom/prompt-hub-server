export class PromptIdEmptyException extends Error {
  constructor() {
    super('Prompt ID cannot be empty.');
    this.name = 'PromptIdEmptyException';
  }
}
