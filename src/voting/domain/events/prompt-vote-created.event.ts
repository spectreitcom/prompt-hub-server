import { IEvent } from '@nestjs/cqrs';
import { PromptId, PromptVoteId, UserId, VoteType } from '../value-objects';

export class PromptVoteCreatedEvent implements IEvent {
  constructor(
    public readonly voteId: PromptVoteId,
    public readonly promptId: PromptId,
    public readonly userId: UserId,
    public readonly voteType: VoteType,
  ) {}
}
