import { PromptHubException } from './prompt-hub.exception';

export class UnauthorizedPromptOperationException extends PromptHubException {
  constructor(operation: string = 'perform this operation on') {
    super(`Only the owner of the prompt can ${operation} it.`);
  }
}
