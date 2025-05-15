// Domain entity for PromptVote
import { AggregateRoot } from '@nestjs/cqrs';

export class PromptVote extends AggregateRoot {
  constructor() {
    super();
  }
}
