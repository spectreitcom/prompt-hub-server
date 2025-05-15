import { PromptId, UserId, PromptVote } from '../../domain';

export abstract class PromptVoteRepository {
  abstract save(vote: PromptVote): Promise<void>;
  abstract getByPromptAndUser(
    promptId: PromptId,
    userId: UserId,
  ): Promise<PromptVote>;
  abstract exists(promptId: PromptId, userId: UserId): Promise<boolean>;
}
