import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { VotePromptCommand } from '../commands';
import { GetPromptVoteStatusQuery } from '../queries';
import { VoteTypeValue } from '../../domain';

@Injectable()
export class VotingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Vote on a prompt
   * @param promptId The ID of the prompt
   * @param userId The ID of the user
   * @param voteType The type of vote (upvote or downvote)
   */
  async votePrompt(
    promptId: string,
    userId: string,
    voteType: VoteTypeValue,
  ): Promise<void> {
    return this.commandBus.execute(
      new VotePromptCommand(promptId, userId, voteType),
    );
  }

  /**
   * Get the vote status for a prompt
   * @param promptId The ID of the prompt
   * @param userId The ID of the user
   * @returns The vote status (1 for upvote, -1 for downvote, 0 for no vote)
   */
  async getPromptVoteStatus(
    promptId: string,
    userId: string,
  ): Promise<{ vote: number }> {
    return this.queryBus.execute(
      new GetPromptVoteStatusQuery(promptId, userId),
    );
  }
}
