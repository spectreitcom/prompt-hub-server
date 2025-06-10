import { PromptHubException } from './prompt-hub.exception';

export class CatalogValidationException extends PromptHubException {
  constructor(message: string) {
    super(message);
  }
}
