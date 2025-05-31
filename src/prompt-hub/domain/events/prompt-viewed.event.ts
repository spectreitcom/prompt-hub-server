import { IEvent } from '@nestjs/cqrs';
import { PromptId, UserId } from '../value-objects';

export class PromptViewedEvent implements IEvent {
  constructor(
    public readonly promptId: PromptId,
    public readonly byUserId?: UserId,
  ) {}
}
