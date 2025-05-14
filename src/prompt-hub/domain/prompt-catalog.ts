import { AggregateRoot } from '@nestjs/cqrs';
import { PromptId } from './value-objects';

export class PromptCatalog extends AggregateRoot {
  constructor() {
    super();
  }

  addPrompt(promptId: PromptId): void {
    //
  }

  removePrompt(promptId: PromptId): void {
    //
  }
}
