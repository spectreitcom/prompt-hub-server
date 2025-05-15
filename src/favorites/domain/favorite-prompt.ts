import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { FavoritePromptId, PromptId, UserId } from './value-objects';
import {
  FavoritePromptCreatedEvent,
  FavoritePromptRemovedEvent,
} from './events';

export class FavoritePrompt extends AggregateRoot {
  private readonly id: FavoritePromptId;
  private readonly promptId: PromptId;
  private readonly userId: UserId;
  private readonly createdAt: Date;
  private removed: boolean;

  constructor(
    id: FavoritePromptId,
    promptId: PromptId,
    userId: UserId,
    createdAt: Date,
    removed: boolean = false,
  ) {
    super();
    this.id = id;
    this.promptId = promptId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.removed = removed;
  }

  static create(promptId: PromptId, userId: UserId): FavoritePrompt {
    const favoritePrompt = new FavoritePrompt(
      FavoritePromptId.create(randomUUID()),
      promptId,
      userId,
      new Date(),
    );

    favoritePrompt.apply(
      new FavoritePromptCreatedEvent(
        favoritePrompt.id,
        favoritePrompt.promptId,
        favoritePrompt.userId,
      ),
    );

    return favoritePrompt;
  }

  remove(): void {
    if (this.removed) {
      return;
    }

    this.removed = true;

    this.apply(
      new FavoritePromptRemovedEvent(this.id, this.promptId, this.userId),
    );
  }

  isRemoved(): boolean {
    return this.removed;
  }

  getId(): FavoritePromptId {
    return this.id;
  }

  getPromptId(): PromptId {
    return this.promptId;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
