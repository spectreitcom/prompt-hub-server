import { PromptHubException } from './prompt-hub.exception';

export class UserValidationException extends PromptHubException {
  constructor(message: string) {
    super(message);
  }
}
