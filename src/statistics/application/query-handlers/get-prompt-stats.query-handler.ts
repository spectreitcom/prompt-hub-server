import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromptStatsQuery } from '../queries';
import {
  PromptStatisticsViewRepository,
  PromptStatisticsAuthorViewRepository,
} from '../ports';
import { PromptStatisticsView } from '../../views';
import { UnauthorizedPromptStatsAccessException } from '../exceptions';

@QueryHandler(GetPromptStatsQuery)
export class GetPromptStatsQueryHandler
  implements IQueryHandler<GetPromptStatsQuery>
{
  constructor(
    private readonly promptStatisticsViewRepository: PromptStatisticsViewRepository,
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async execute(query: GetPromptStatsQuery): Promise<PromptStatisticsView> {
    // Check if the user is the owner of the prompt
    const authorStats =
      await this.promptStatisticsAuthorViewRepository.findByPromptId(
        query.promptId,
      );

    if (!authorStats) {
      return null;
    }

    // Only the owner of the prompt can see the statistics
    if (authorStats.authorId !== query.userId) {
      throw new UnauthorizedPromptStatsAccessException(
        'Only the owner of the prompt can see these statistics',
      );
    }

    // Get the prompt statistics
    return await this.promptStatisticsViewRepository.findByPromptId(
      query.promptId,
    );
  }
}
