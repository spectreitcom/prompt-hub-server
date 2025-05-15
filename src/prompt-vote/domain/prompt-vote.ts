// Domain entity for PromptVote
import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { PromptId, PromptVoteId, UserId, VoteType } from './value-objects';
import { PromptVoteChangedEvent, PromptVoteCreatedEvent } from './events';

export class PromptVote extends AggregateRoot {
  private readonly id: PromptVoteId;
  private readonly promptId: PromptId;
  private readonly userId: UserId;
  private voteType: VoteType;
  private readonly createdAt: Date;

  constructor(
    id: PromptVoteId,
    promptId: PromptId,
    userId: UserId,
    voteType: VoteType,
    createdAt: Date,
  ) {
    super();
    this.id = id;
    this.promptId = promptId;
    this.userId = userId;
    this.voteType = voteType;
    this.createdAt = createdAt;
  }

  static create(
    promptId: PromptId,
    userId: UserId,
    voteType: VoteType,
  ): PromptVote {
    const vote = new PromptVote(
      PromptVoteId.create(randomUUID()),
      promptId,
      userId,
      voteType,
      new Date(),
    );

    vote.apply(
      new PromptVoteCreatedEvent(
        vote.id,
        vote.promptId,
        vote.userId,
        vote.voteType,
      ),
    );

    return vote;
  }

  changeVote(newVoteType: VoteType): void {
    if (this.isSameVoteType(newVoteType)) {
      return;
    }

    const oldVoteType = this.voteType;
    this.voteType = newVoteType;

    this.apply(
      new PromptVoteChangedEvent(
        this.id,
        this.promptId,
        this.userId,
        oldVoteType,
        this.voteType,
      ),
    );
  }

  isSameVoteType(voteType: VoteType): boolean {
    return this.voteType.equals(voteType);
  }

  getId(): PromptVoteId {
    return this.id;
  }

  getPromptId(): PromptId {
    return this.promptId;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getVoteType(): VoteType {
    return this.voteType;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
