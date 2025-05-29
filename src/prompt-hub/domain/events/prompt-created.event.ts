import { IEvent } from '@nestjs/cqrs';
import {
  PromptContent,
  PromptId,
  PromptInstruction,
  PromptStatus,
  PromptTimestamps,
  PromptTitle,
  PromptVisibility,
  UserId,
} from '../value-objects';

export class PromptCreatedEvent implements IEvent {
  constructor(
    public readonly promptId: PromptId,
    public readonly authorId: UserId,
    public readonly title: PromptTitle,
    public readonly content: PromptContent,
    public readonly status: PromptStatus,
    public readonly visibility: PromptVisibility,
    public readonly timestamps: PromptTimestamps,
    public readonly instruction?: PromptInstruction,
  ) {}
}
