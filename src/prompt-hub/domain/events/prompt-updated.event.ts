import { IEvent } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptId,
  PromptInstruction,
  PromptTimestamps,
  PromptTitle,
  UserId,
} from '../value-objects';

export class PromptUpdatedEvent implements IEvent {
  constructor(
    public readonly promptId: PromptId,
    public readonly authorId: UserId,
    public readonly title: PromptTitle,
    public readonly content: PromptContent,
    public readonly timestamps: PromptTimestamps,
    public readonly instruction?: PromptInstruction,
  ) {}
}
