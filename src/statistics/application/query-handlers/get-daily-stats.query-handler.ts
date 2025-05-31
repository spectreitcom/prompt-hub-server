import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyStatsQuery } from '../queries';
import {
  PromptDailyStatsViewRepository,
  PromptStatisticsAuthorViewRepository,
} from '../ports';
import { PromptDailyStatsView } from '../../views';
import { UnauthorizedPromptStatsAccessException } from '../exceptions';

@QueryHandler(GetDailyStatsQuery)
export class GetDailyStatsQueryHandler
  implements IQueryHandler<GetDailyStatsQuery>
{
  constructor(
    private readonly promptDailyStatsViewRepository: PromptDailyStatsViewRepository,
    private readonly promptStatisticsAuthorViewRepository: PromptStatisticsAuthorViewRepository,
  ) {}

  async execute(query: GetDailyStatsQuery): Promise<PromptDailyStatsView[]> {
    // Check if the user is the owner of the prompt
    const authorStats =
      await this.promptStatisticsAuthorViewRepository.findByPromptId(
        query.promptId,
      );

    if (!authorStats) {
      return [];
    }

    // Only the owner of the prompt can see the statistics
    if (authorStats.authorId !== query.userId) {
      throw new UnauthorizedPromptStatsAccessException(
        'Only the owner of the prompt can see these statistics',
      );
    }

    // Get the prompt daily statistics for the date range
    return await this.promptDailyStatsViewRepository.findByDateRange(
      query.promptId,
      query.startDate,
      query.endDate,
    );
  }
}