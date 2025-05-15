import { IEvent } from '@nestjs/cqrs';
import { PromptId, PromptVisibility } from '../value-objects';

export class PromptVisibilityChangedEvent implements IEvent {
  constructor(
    public readonly promptId: PromptId,
    public readonly visibility: PromptVisibility,
  ) {}
}
