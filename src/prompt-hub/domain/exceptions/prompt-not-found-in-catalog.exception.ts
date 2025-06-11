import { PromptHubException } from './prompt-hub.exception';

export class PromptNotFoundInCatalogException extends PromptHubException {
  constructor(promptId: string, catalogId: string) {
    super(
      `Prompt with id ${promptId} not found in catalog with id ${catalogId}.`,
    );
  }
}
