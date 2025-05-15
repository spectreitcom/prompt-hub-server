import { FavoritePromptId, PromptId, UserId } from '../value-objects';

export class FavoritePromptCreatedEvent {
  constructor(
    public readonly id: FavoritePromptId,
    public readonly promptId: PromptId,
    public readonly userId: UserId,
  ) {}
}
