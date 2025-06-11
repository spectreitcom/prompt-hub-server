import { PromptHubException } from './prompt-hub.exception';

export class PromptNotFoundException extends PromptHubException {
  constructor(promptId: string) {
    super(`Prompt with id ${promptId} not found.`);
  }
}
