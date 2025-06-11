import { PromptHubException } from './prompt-hub.exception';

export class BusinessRuleViolationException extends PromptHubException {
  constructor(message: string) {
    super(message);
  }
}
