import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptVoteStatusQuery } from '../queries';
import { PromptVoteEntryViewRepository } from '../ports';

@QueryHandler(GetPromptVoteStatusQuery)
export class GetPromptVoteStatusQueryHandler
  implements IQueryHandler<GetPromptVoteStatusQuery>
{
  constructor(
    private readonly promptVoteEntryViewRepository: PromptVoteEntryViewRepository,
  ) {}

  async execute(query: GetPromptVoteStatusQuery): Promise<{ vote: number }> {
    const { promptId, userId } = query;

    const promptVoteEntry =
      await this.promptVoteEntryViewRepository.findByPromptAndUser(
        promptId,
        userId,
      );

    // If no vote entry is found, return 0 (no vote)
    if (!promptVoteEntry) {
      return { vote: 0 };
    }

    // Return the vote value (1 for upvote, -1 for downvote)
    return { vote: promptVoteEntry.vote };
  }
}
