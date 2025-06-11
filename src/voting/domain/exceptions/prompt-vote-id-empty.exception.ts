export class PromptVoteIdEmptyException extends Error {
  constructor() {
    super('Prompt Vote ID cannot be empty.');
    this.name = 'PromptVoteIdEmptyException';
  }
}
