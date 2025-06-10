export class PromptIdInvalidException extends Error {
  constructor() {
    super('Prompt ID must be a valid UUID.');
    this.name = 'PromptIdInvalidException';
  }
}
