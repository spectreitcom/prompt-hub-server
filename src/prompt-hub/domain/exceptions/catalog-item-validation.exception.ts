import { PromptHubException } from './prompt-hub.exception';

export class CatalogItemValidationException extends PromptHubException {
  constructor(message: string) {
    super(message);
  }
}
