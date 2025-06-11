import { PromptHubException } from './prompt-hub.exception';

export class CatalogNotFoundException extends PromptHubException {
  constructor(catalogId: string) {
    super(`Catalog with id ${catalogId} not found.`);
  }
}
