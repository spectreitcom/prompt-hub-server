import { PromptHubException } from './prompt-hub.exception';

export class PromptAlreadyInCatalogException extends PromptHubException {
  constructor(promptId: string, catalogId: string) {
    super(
      `Prompt with id ${promptId} is already in catalog with id ${catalogId}.`,
    );
  }
}
