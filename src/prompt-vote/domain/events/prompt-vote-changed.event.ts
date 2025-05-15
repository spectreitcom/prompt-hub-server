import { IEvent } from '@nestjs/cqrs';
import { PromptId, PromptVoteId, UserId, VoteType } from '../value-objects';

export class PromptVoteChangedEvent implements IEvent {
  constructor(
    public readonly voteId: PromptVoteId,
    public readonly promptId: PromptId,
    public readonly userId: UserId,
    public readonly oldVoteType: VoteType,
    public readonly newVoteType: VoteType,
  ) {}
}
