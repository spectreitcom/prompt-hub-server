import { IEvent } from '@nestjs/cqrs';
import { PromptId, TagValue, UserId } from '../value-objects';

export class PromptTagsReplacedEvent implements IEvent {
  constructor(
    public readonly promptId: PromptId,
    public readonly authorId: UserId,
    public readonly tags: TagValue[],
  ) {}
}
