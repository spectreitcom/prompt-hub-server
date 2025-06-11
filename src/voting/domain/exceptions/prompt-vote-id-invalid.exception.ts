export class PromptVoteIdInvalidException extends Error {
  constructor() {
    super('Prompt Vote ID must be a valid UUID.');
    this.name = 'PromptVoteIdInvalidException';
  }
}
