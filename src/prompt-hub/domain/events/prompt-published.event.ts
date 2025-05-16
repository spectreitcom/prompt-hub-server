import { IEvent } from '@nestjs/cqrs';
import { PromptContent, PromptId, PromptTitle, UserId } from '../value-objects';

export class PromptPublishedEvent implements IEvent {
  constructor(
    public readonly promptId: PromptId,
    public readonly authorId: UserId,
    public readonly title: PromptTitle,
    public readonly content: PromptContent,
  ) {}
}
