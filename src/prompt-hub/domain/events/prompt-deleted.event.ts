import { IEvent } from '@nestjs/cqrs';
import { PromptId } from '../value-objects';

export class PromptDeletedEvent implements IEvent {
  constructor(public readonly promptId: PromptId) {}
}
