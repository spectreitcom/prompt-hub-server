import { PromptHubException } from './prompt-hub.exception';

export class UnauthorizedCatalogOperationException extends PromptHubException {
  constructor(operation: string = 'perform this operation on') {
    super(`Only the owner of the catalog can ${operation} it.`);
  }
}
