import { PromptHubException } from './prompt-hub.exception';

export class PromptValidationException extends PromptHubException {
  constructor(message: string) {
    super(message);
  }
}
